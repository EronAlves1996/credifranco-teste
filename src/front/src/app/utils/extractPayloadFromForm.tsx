export const extractPayloadFromForm = (target: EventTarget) => {
  const formData = new FormData(target as unknown as HTMLFormElement);

  return Object.fromEntries(formData);
};
