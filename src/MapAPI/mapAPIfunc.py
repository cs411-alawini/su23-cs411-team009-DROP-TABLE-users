import requests

api_key = "AnCiUQKehSo7BmsdF1bKwT9veAkYnhOI0bwCbnTERCvK4QidM97x4ZnGaGoqSyUP"

def get_walk_travel_time(start_location, end_location):
    base_url = "https://dev.virtualearth.net/REST/v1/Routes/Walking"

    global api_key
    
    params = {
        "waypoint.1": start_location,
        "waypoint.2": end_location,
        "travelMode": "walking",
        "key": api_key
    }

    response = requests.get(base_url, params=params)
    data = response.json()
    

    # Extract the travel time from the API response
    if "resourceSets" in data and len(data["resourceSets"]) > 0 and "resources" in data["resourceSets"][0] and len(data["resourceSets"][0]["resources"]) > 0:
        travel_duration = data["resourceSets"][0]["resources"][0]["travelDuration"] # time in secs

        return int(travel_duration/60) #return in mins
    else: 
        return "Error"


def get_drive_travel_time(start_location, end_location):
    base_url = "https://dev.virtualearth.net/REST/v1/Routes/Driving"

    global api_key

    params = {
        "waypoint.1": start_location,
        "waypoint.2": end_location,
        "travelMode": "Driving",
        "key": api_key
    }

    response = requests.get(base_url, params=params)
    data = response.json()
    

    # Extract the travel time from the API response
    if "resourceSets" in data and len(data["resourceSets"]) > 0 and "resources" in data["resourceSets"][0] and len(data["resourceSets"][0]["resources"]) > 0:
        travel_duration = data["resourceSets"][0]["resources"][0]["travelDuration"] # time in secs

        return int(travel_duration/60) #return in mins
    else:
        return "Error"
    
    
def get_transit_travel_time(start_location, end_location):
    base_url = "https://dev.virtualearth.net/REST/v1/Routes/Transit"

    global api_key

    params = {
        "waypoint.1": start_location,
        "waypoint.2": end_location,
        "travelMode": "Transit",
        "key": api_key
    }

    response = requests.get(base_url, params=params)
    data = response.json()


    # Extract the travel time from the API response
    if "resourceSets" in data and len(data["resourceSets"]) > 0 and "resources" in data["resourceSets"][0] and len(data["resourceSets"][0]["resources"]) > 0:
        travel_duration = data["resourceSets"][0]["resources"][0]["travelDuration"] # time in secs

        return int(travel_duration/60) #return in mins
    else:
        return "Error"