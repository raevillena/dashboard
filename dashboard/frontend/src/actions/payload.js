

//connect mqtt client
export const updateData = (type, data) => (dispatch) => {
    dispatch({
        type: type,
        payload: data
    });
}

//disconnect event