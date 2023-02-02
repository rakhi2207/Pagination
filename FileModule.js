let DataRetrieved=[];
function sortHelper(sortOrder)
{
    let value=document.getElementById("data").value;
    let oTable = document.getElementById("mytable");
    let oCells = oTable.rows.item(0).cells;
    let cellLength=oCells.length;
    let columnindex=-1;
        for(var j = 0; j < cellLength; j++){
            if(oCells.item(j).innerHTML.toLowerCase().includes(value.toLowerCase()))
            {
                value=oCells.item(j).innerHTML;
                columnindex=j;
                break;
            }
        }
        console.log(DataRetrieved)
        if(columnindex!=-1)
        {
            if(sortOrder=="ascending"){
            DataRetrieved.sort((a,b)=>{
                return (a[value]> b[value])?1:(a[value] < b[value])?-1:0;
             });
            }else
            {
                DataRetrieved.sort((a,b)=>{
                    return (a[value]< b[value])?1:(a[value] > b[value])?-1:0;
                 });
            }

            let count=0;
            let rowLength = oTable.rows.length;  
            for (i = 1; i < rowLength; i++){  
              oCells = oTable.rows.item(i).cells;
              let cd=DataRetrieved[i-1];
              let ok=Object.keys(cd);
               let cellLength = oCells.length;
               for(let j = 0; j < cellLength; j++){
                    if(ok[j] == "picture")
                    {
                        let imgrc = document.createElement('img');
                        imgrc.src = cd[ok[j]];
                        oCells[0].removeChild(oCells[0].firstElementChild);
                        oCells.item(j).appendChild(imgrc);
                    }else{
                        oCells.item(j).innerHTML=cd[ok[j]];
                   }
                }
            }
        }
}
function ascending()
{
    sortHelper("ascending");
}
function descending()
{
    sortHelper("descending");
}


let header=document.getElementById("mytable");
function appendColumn(row,data)
{
    let col=document.createElement("td");
    let cellText = document.createTextNode(data);
    col.appendChild(cellText);
    row.appendChild(col);
    header.appendChild(row)
}
let page =1;
let results=20;

async function getData(){

    let value=await fetch(`http://127.0.0.1:8080/?page=${page}&results=${results}&seed=abc`)
    page+=1
    let data=await value.json();
   
    for(let x of data.results){
        let appendObject={};
        let row = document.createElement("tr");
        let img=document.createElement("img");
        img.src=x.picture.medium;
        let col = document.createElement("td");
        col.appendChild(img);
        row.appendChild(col);
        appendObject["picture"]=x.picture.medium;
       appendColumn(row,x.dob.age);
       appendObject["age"]=x.dob.age;
       appendColumn(row,x.email);
       appendObject["email"]=x.email;
       appendColumn(row,x.gender);
       appendObject["gender"]=x.gender;
       appendColumn(row,x.id.name);
       appendObject["id name"]=x.id.name;
       appendColumn(row,x.location.city);
       appendObject["city"]=x.location.city;
       appendColumn(row,x.login.username);
       appendObject["username"]=x.login.username;
       appendColumn(row,x.name.first);
       appendObject["First Name"]=x.name.first;
       appendColumn(row,x.name.last);
       appendObject["Last Name"]=x.name.last;

       DataRetrieved.push(appendObject);
    }
}


getData();

function search()
{
    let passedQuery=document.getElementById("searching").value;
    let oTable = document.getElementById("mytable");
    let rowLength = oTable.rows.length;  
    for (i = 1; i < rowLength; i++){  
      oCells = oTable.rows.item(i).cells;
      let cd=DataRetrieved[i-1];
    //   let ok=Object.keys(cd);
       let cellLength = oCells.length;
       let check=false;
       for(let j = 0; j < cellLength; j++){
             if(oCells.item(j).innerHTML.includes(passedQuery))
             {
                check=true;
                break;
             }
           }
           console.log(check)
           if(!check)
           {
             Object.values(oCells).map((ec)=>
                {
                    ec.style.display="none";
                })
           }
    }

}
