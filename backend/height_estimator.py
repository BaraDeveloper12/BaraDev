def estimate_height(body_ratio: float):
    reference_height = 170
    estimated_height = round(reference_height * body_ratio, 1)
    return estimated_height
