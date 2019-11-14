import React from 'react';

export default function Description(props) {
  console.log(props)
  return (
    <div>
      {props.info.map(el => (
        <div key={el.id}>
          {el.description}
        </div>
      ))}
    </div>
  )
}