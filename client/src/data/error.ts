const handleError = (error: { response: { data: { warning: any; exception: any } }; Error: any }) => {
    if (!error.response || !error.response.data) {
        return { handleErrorMessage: { serverError: "ocorreu um erro no servidor" } }
    }

    if (error.response.data.warning) {
        return { handleErrorMessage: error.response.data }
    }
    else if (error.response.data.exception) {
        return { handleErrorMessage: error.response.data }
    }
    else {
        return { handleErrorMessage: error.Error }
    }
}

export default handleError;