export function navigate(route, state = {}) {
  return {
    type: '@navigation/NAVIGATE',
    payload: { route, state },
  };
}
