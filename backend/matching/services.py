"""
Rule-based matching. No ML, no black-box scoring.
Every point in the score is explainable, which matters for trust
when a user sees a percentage next to another party's requirement.
"""
from requirements_app.models import Requirement


def _ranges_overlap(a_min, a_max, b_min, b_max):
    if a_min is None or a_max is None or b_min is None or b_max is None:
        return None  # unknown, excluded from scoring rather than counted as a miss
    return a_max >= b_min and b_max >= a_min


def score_pair(req_a: Requirement, req_b: Requirement):
    """
    Returns (score_percent, breakdown_dict).
    Only compares fields present on both sides; missing data is excluded
    from the denominator instead of being counted as a mismatch.
    """
    checks = []

    if req_a.location and req_b.location:
        checks.append(("location", req_a.location.strip().lower() == req_b.location.strip().lower()))

    if req_a.industry and req_b.industry:
        checks.append(("industry", req_a.industry.strip().lower() == req_b.industry.strip().lower()))

    if req_a.opportunity_type in (
        Requirement.OpportunityType.FRANCHISE,
        Requirement.OpportunityType.DEALER,
        Requirement.OpportunityType.ASSOCIATE,
    ):
        overlap = _ranges_overlap(
            req_a.investment_min, req_a.investment_max, req_b.investment_min, req_b.investment_max
        )
        if overlap is not None:
            checks.append(("investment_range", overlap))

    if req_a.opportunity_type == Requirement.OpportunityType.JOB:
        overlap = _ranges_overlap(req_a.salary_min, req_a.salary_max, req_b.salary_min, req_b.salary_max)
        if overlap is not None:
            checks.append(("salary_range", overlap))

        if req_a.skills and req_b.skills:
            a_skills = {s.strip().lower() for s in req_a.skills.split(",") if s.strip()}
            b_skills = {s.strip().lower() for s in req_b.skills.split(",") if s.strip()}
            if a_skills and b_skills:
                checks.append(("skills_overlap", bool(a_skills & b_skills)))

    if not checks:
        return 0, {}

    passed = sum(1 for _, ok in checks if ok)
    score = round((passed / len(checks)) * 100)
    breakdown = {name: ok for name, ok in checks}
    return score, breakdown


def find_matches(requirement: Requirement, min_score: int = 0):
    """
    Finds candidate requirements on the opposite side (company <-> individual)
    of the same opportunity_type, scores each, returns sorted results.
    """
    opposite = (
        Requirement.PostedByType.INDIVIDUAL
        if requirement.posted_by_type == Requirement.PostedByType.COMPANY
        else Requirement.PostedByType.COMPANY
    )
    candidates = Requirement.objects.filter(
        posted_by_type=opposite,
        opportunity_type=requirement.opportunity_type,
        status=Requirement.Status.ACTIVE,
    ).exclude(user=requirement.user)

    results = []
    for candidate in candidates:
        score, breakdown = score_pair(requirement, candidate)
        if score >= min_score:
            results.append({"requirement": candidate, "score": score, "breakdown": breakdown})

    results.sort(key=lambda r: -r["score"])
    return results
