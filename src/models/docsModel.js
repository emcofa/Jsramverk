const docsModel = {
    baseUrl: window.location.href.includes("localhost") ?
        "http://localhost:8888/docs" :
        "https://jsramverk-editor-emfh21.azurewebsites.net/docs",
    getAllDocs: async function getAllDocs(token) {
        const response = await fetch(`${docsModel.baseUrl}/`, {
            headers: {
                "x-access-token": token,
            }
        });

        const docs = await response.json();

        return docs.data
    },
    getSingleDocs: async function getSingleDocs(id, token) {
        const response = await fetch(`${docsModel.baseUrl}/docs/${id}`, {
            headers: {
                "x-access-token": token,
            }
        });
        

        // console.log(window.location.href);

        const docs = await response.json();

        return docs.data
    },
    getUserDocuments: async function getUserDocuments(email) {
        const response = await fetch(`${docsModel.baseUrl}/user/documents`);

        const docs = await response.json();

        return docs.data
    },
    giveAccess: async function giveAccess(update, id, token) {
        const response = await fetch(`${docsModel.baseUrl}/access/${id}`, {
            body: JSON.stringify(update),
            headers: {
                'content-type': 'application/json',
                "x-access-token": token,
            },
            method: 'PUT'
        });

        const docs = await response.json();
        return docs.data
    },
    update: async function update(update, id, token) {
        const response = await fetch(`${docsModel.baseUrl}/update/${id}`, {
            body: JSON.stringify(update),
            headers: {
                'content-type': 'application/json',
                "x-access-token": token,
            },
            method: 'PUT'
        });

        const docs = await response.json();
        return docs.data
    },
    saveDocs: async function saveDocs(newDoc, token) {
        const response = await fetch(`${docsModel.baseUrl}/`, {
            body: JSON.stringify(newDoc),
            headers: {
                'content-type': 'application/json',
                "x-access-token": token,
            },
            method: 'POST'
        });
        const result = await response.json();
        return result.data
    }
}

export default docsModel;