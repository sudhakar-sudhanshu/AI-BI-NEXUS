reports = []

def add_report(name):
    reports.append({
        "id": len(reports) + 1,
        "name": name
    })

def get_reports():
    return reports