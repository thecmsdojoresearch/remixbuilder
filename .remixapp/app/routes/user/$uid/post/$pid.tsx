export const loader = async ({ params }) => {
  const uid = params.uid;
  const pid = params.pid;
  return {
    uid,
    pid
  }
}
