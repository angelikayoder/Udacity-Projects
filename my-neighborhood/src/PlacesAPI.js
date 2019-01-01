import axios from 'axios';

export const getPlaces = () => {
    const searchEndpoint = "https://api.foursquare.com/v2/search/recommendations?"

    const parameters = {
        client_id: "1PDW4N4XLZ2QQTATI55V00VDZRQNTHE40XZHI0BMJOXJOJW5",
        client_secret: "5BHER5Y5T4FBN25S0SPJIABVKZLINOYEPLVVD0QSEXEL0DWG",
        // query: "Czech",
        categoryId: "52f2ae52bcbc57f1066b8b81",
        near: "Berwyn",
        radius: "100000",
        v: "20182212"
    }

    return axios.get(searchEndpoint + new URLSearchParams(parameters))
                .then(response => {
                    return response.data.response.group.results
                })
                .catch(error => {
                    console.log(error)
                })
}
