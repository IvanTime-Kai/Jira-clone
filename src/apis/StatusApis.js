import BaseServices from "../services/baseServices"


class StatusApis extends BaseServices{
    fetchGetAllStatus = () => {
        return this.get('Status/getAll')
    }
}

export const statusApis = new StatusApis()