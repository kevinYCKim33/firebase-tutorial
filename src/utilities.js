export const collectIdsAndDocs = (doc) => {
  return { id: doc.id, ...doc.data() }; // part of doc.data() had id set stupidly as Date.now() which overrode the id: doc.id()
};
