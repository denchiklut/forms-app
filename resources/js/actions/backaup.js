import axios from "axios";

export const STORE_BACKUP = "STORE_BACKUP"
export const GET_BACKUP = "GET_BACKUP"

export const fetchbackups = () => async dispatch => {
    const result = await axios.get(`/api/backup/`)
    dispatch({ type: GET_BACKUP, payload: result.data })
}



export const fetchAddBackup = backaupData => async dispatch => {
    const result = await axios.post('/api/backup', backaupData)
    dispatch({ type: STORE_BACKUP, payload: result.data })
}
