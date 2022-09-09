const docsModel = {
    baseUrl: window.location.href.includes("localhost") ?
        "http://localhost:8888/docs" :
        "https://jsramverk-editor-emfh21.azurewebsites.net/docs",
    getAllDocs: async function getAllDocs() {
        const response = await fetch(`${docsModel.baseUrl}/`);

        // console.log(window.location.href);

        const docs = await response.json();

        return docs.data
    },
    getSingleDocs: async function getSingleDocs(id) {
        const response = await fetch(`${docsModel.baseUrl}/docs/${id}`);

        // console.log(window.location.href);

        const docs = await response.json();

        return docs.data
    },
    update: async function update(update, id) {
        const response = await fetch(`${docsModel.baseUrl}/update/${id}`, {
            body: JSON.stringify(update),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        });

        const docs = await response.json();
        return docs.data
    },
    saveDocs: async function saveDocs(newDoc) {
        const response = await fetch(`${docsModel.baseUrl}/`, {
            body: JSON.stringify(newDoc),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        });
        const result = await response.json();
        return result.data
    }
}

export default docsModel;