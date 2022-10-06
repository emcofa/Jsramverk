const docsModel = {
    baseUrl: window.location.href.includes("localhost") ?
        "http://localhost:8888/docs" :
        "https://jsramverk-editor-emfh21.azurewebsites.net/docs",
    baseUrlGraphql: window.location.href.includes("localhost") ?
        "http://localhost:8888" :
        "https://jsramverk-editor-emfh21.azurewebsites.net",
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
        console.log(newDoc);
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
    },
    graphQlSaveDocs: async function graphQlSaveDocs(newDoc, token) {
        fetch(`${docsModel.baseUrlGraphql}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "x-access-token": token,
            },
            body: JSON.stringify({ query: `mutation { insertDocument(name: "${newDoc.name}", html: "${newDoc.html}", owner: "${newDoc.owner}", allowed_users: "${newDoc.owner}") {
                name
            } }` })
        })
            .then(r => r.json())
            .then(data => console.log('data returned:', data));

    }
}

export default docsModel;