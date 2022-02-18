import React, { useEffect, useState } from "react";

function Futbolista(data){
    console.log(data)
    return (
        <ul>{
            data.map(el => ( 
                <li key={el.id}>id: {el.id} - {el.nombres} {el.apellidos}</li>
                ))
            }
        </ul>
    )
}

export default Futbolista;