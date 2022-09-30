const authModel = {
    baseUrl: window.location.href.includes("localhost") ?
        "http://localhost:8888" :
        "https://jsramverk-editor-emfh21.azurewebsites.net",
    login: async function login(user) {
        const response = await fetch(`${authModel.baseUrl}/login`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
        });

        const result = await response.json();

        return result;
    },
    register: async function register(user) {
        const response = await fetch(`${authModel.baseUrl}/register`, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                'content-type': 'application/json'
            },
        });

        console.log(response);

        const result = await response.json();

        return result;
    }
};
export default authModel;