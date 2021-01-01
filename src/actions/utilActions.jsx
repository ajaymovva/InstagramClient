export const showSuccessAlert = (message) => {
    return {
        type: 'SET_ALERT',
        payload: {
            open: true,
            severity: "success",
            message
        }
    }
}

export const showErrorAlert = (message) => {
    return {
        type: 'SET_ALERT',
        payload: {
            open: true,
            severity: "error",
            message
        }
    }
}

export const showInfoAlert = (message) => {
    return {
        type: 'SET_ALERT',
        payload: {
            open: true,
            severity: "info",
            message
        }
    }
}

export const showWarningAlert = (message) => {
    return {
        type: 'SET_ALERT',
        payload: {
            open: true,
            severity: "warning",
            message
        }
    }
}

export const clearAlert = () => {
    return {
        type: 'CLEAR_ALERT'
    }
}

export const isEmpty = (value) => {
    if(value){
        if(value.type === "string" || Array.isArray(value)){
            return value.length > 0;
        }
        else {
            return Object.keys(value).length >= 0;
        }
    }
    return false;
}