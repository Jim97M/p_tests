import axiosService from './NetworkService';

  const getAll = () => {
        return axiosService.get("/rest/sample");
    }

 const patch = (_id, data) => {
    return axiosService.patch(`/rest/sample/${_id}`, data);
 }   

const ItemDataService = {
    patch
};

export default ItemDataService;
