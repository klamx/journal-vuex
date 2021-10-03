import journalApi from '@/api/journalApi';

// export const myAction = async ({ commit }) => {};

export const loadEntries = async ({ commit }) => {
  const { data } = await journalApi.get('/entries.json');

  if (!data) {
    commit('setEntries', []);
    return;
  }

  const entries = [];
  for (let id of Object.keys(data)) {
    entries.push({
      id,
      ...data[id],
    });
  }

  commit('setEntries', entries);
};

export const updateEntry = async ({ commit }, entry) => {
  const newEntry = { ...entry };
  delete newEntry.id;
  await journalApi.put(`/entries/${entry.id}.json`, newEntry);
  commit('updateEntry', { ...entry });
};

export const createEntry = async ({ commit }, entry) => {
  const { data } = await journalApi.post(`/entries.json`, entry);
  const { name } = data;
  const newEntry = { id: name, ...entry };
  commit('addEntry', { ...newEntry });
  return name;
};

export const deleteEntry = async ({ commit }, id) => {
  await journalApi.delete(`/entries/${id}.json`);
  commit('deleteEntry', id);
};
