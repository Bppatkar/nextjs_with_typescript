import React from 'react';

const page = async ({ params }) => {
  // const {user} = await params;
  // console.log(user);

  const userData = await params;
  const data = userData.user;
  console.log(data);
  return <div>this is dynamic route and user is {data}</div>;
};

export default page;
