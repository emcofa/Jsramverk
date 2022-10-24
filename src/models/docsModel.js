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


        const docs = await response.json();

        return docs.data
    },
    postData: async function postData(usersName, email, access, doc, text) {
        fetch(`${docsModel.baseUrl}/send`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usersName,
                email,
                access,
                doc,
                text
            })
        }).then(res => res.json())
            .then(data => {
                return data.response.message
            });
    },
    graphQlSaveDocs: async function graphQlSaveDocs(newDoc, token) {
        fetch(`${docsModel.baseUrlGraphql}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "x-access-token": token,
            },
            body: JSON.stringify({
                query: `mutation { insertDocument(name: "${newDoc.name}", html: "${newDoc.html}", owner: "${newDoc.owner}", allowed_users: "${newDoc.owner}") {
                name
            } }` })
        })
            .then(r => r.json())
            .then(data => console.log('data returned:', data));

    },
    graphQlGiveAccess: async function graphQlGiveAccess(update, id, token) {
        fetch(`${docsModel.baseUrlGraphql}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "x-access-token": token,
            },
            body: JSON.stringify({
                query: `mutation { giveAccess(_id: "${id}", allowed_users: "${update.allowed_user}") {
                    allowed_users
            } }` })
        })
            .then(r => r.json())
            .then(data => console.log('data returned:', data));

    },
    graphQlUpdateName: async function graphQlUpdateName(update, id, token) {
        fetch(`${docsModel.baseUrlGraphql}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "x-access-token": token,
            },
            body: JSON.stringify({
                query: `mutation { updateName(_id: "${id}", name: "${update.name}") {
                    name
            } }` })
        })
            .then(r => r.json())
            .then(data => console.log('data returned:', data));

    },

}

export default docsModel;