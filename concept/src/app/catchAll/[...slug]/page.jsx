import React from 'react';

const page = async({params}) => {
  const {slug} = await params
  console.log(slug)
  return (
    <div>
      this is inside catch all route
      <p>routing is {slug.join('/-')}</p>
    </div>
  );
};

export default page;
