import { useState } from 'react';

import api from './config/axios';

function useCrud(url: string) {
  const [data, setData] = useState<any[]>([]);

  const get = async (query: { [params: string]: Object }) => {
    const queryString = Object.entries(query).map(([param, value]) => (
      `${param}=${JSON.stringify(value)}`
    )).join('&');

    const res = await api.get(`${url}${queryString ? `?${queryString}` : ''}`);

    setData(res.data);
    return res;
  };

  const create = async (body: Object) => {
    const res = await api.post(url, body);
    setData((prevData) => [...prevData, res.data]);
  };

  const getOne = (id: number | string) => api.get(`${url}/${id}`);

  const remove = async (id: number | string) => {
    await api.delete(`${url}/${id}`);
    setData((prevData) => prevData.filter((item) => (
      item.id !== id
    )));
  };

  const edit = async (id: number | string, body: Object) => {
    const res = await api.patch(`${url}/${id}`, body);
    setData((prevData) => prevData.map((item) => {
      if (item.id === id) {
        return res.data;
      }
      return item;
    }))
  };

  return {
    data,
    get,
    create,
    getOne,
    remove,
    edit,
  };
}

export default useCrud;
