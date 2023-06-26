var selectedRow=null;
var ids=[];
var data =[];
var deleIds =[];
let sub_btn = document.getElementById("sub_btn");

sub_btn.addEventListener("click",employee_operation);

var parentElemnt_table =document.getElementById("storelist");
var rows =document.getElementById("table_data");
console.log(sub_btn);



function employee_operation(event) {
    event.preventDefault();
    var data=readData();
    // console.log(data);

    if(Validate(data)){
        if(selectedRow===null || sub_btn.textContent =="ADD"){
            insertRecord(data);
        }else{
            
            update_record(data);
            sub_btn.textContent ="ADD";
        }
        reser_data();
    }else{
       return false;
    }

}

//Read Data from Client Site
function readData(e) {
  
    data["employee_id"]=document.getElementById("employee_id").value;
    data["name"] = document.getElementById("name").value;
    data["Age"]= document.getElementById("Age").value;
    data["gender_id"] = document.getElementById("gender_id").value;

    // var employee_id=document.getElementById("employee_id").value;
    // var name = document.getElementById("name").value;
    // var Age= document.getElementById("Age").value;
    // var gender_id = document.getElementById("gender_id").value;

     return data;
}

function Validate() {

    var eid =document.getElementById("employee_id").value
    var name =document.getElementById("name").value
    var age =document.getElementById("Age").value
    var gender =document.getElementById("gender_id").value

    var isValid = true;

    // if(eid=="" && name=="" && age =="" && gender ==""){
    //     document.getElementById('error').textContent = 'Please Enter the valid Employee_ID';
    //     document.getElementById('nameerror').textContent = 'Please enter a valid name with alphabets only';
    //     document.getElementById('nameerror').textContent = 'Please enter a valid name with alphabets only';
    //     document.getElementById('Ageerror').textContent = 'Please Enter a  Age';
    //     document.getElementById('gendererror').textContent = 'Please select a gender';
    //     isValid = false;
    // }

    if (eid == '' || isNaN(eid)) {
        document.getElementById('error').textContent = 'Please Enter the valid Employee_ID';
        isValid = false;
      }else if(checkEmployeevalid(eid) ==true ){
        document.getElementById('error').textContent = ' This Employee_ID can not be assigned to any other Employee';
           isValid = false;
      }  
     else {
        document.getElementById('error').textContent = '';
      }

    // Name Validation
    if (name == '' || !/^[a-zA-Z\s]+$/.test(name)) {
        document.getElementById('nameerror').textContent = 'Please enter a valid name with alphabets only';
        isValid = false;
        
    } else if (!/^[a-zA-Z\s]+$/.test(name) && name != ' '){
        document.getElementById('nameerror').textContent = 'Invalid Format';
        isValid = false;
    } else{
        document.getElementById('nameerror').textContent = '';
    }

    //Validate Age
    if (age == '' || isNaN(age)) {
        document.getElementById('Ageerror').textContent = 'Please Enter a  Age';
        isValid = false;
    }  else if(age <= 17 || age >= 61) {
        document.getElementById('Ageerror').textContent = 'Age is valid from 18-60';
        isValid = false;
    }else{
        document.getElementById('Ageerror').textContent = '';
    }

    // Validate Gender
    if (gender == '') {
        document.getElementById('gendererror').textContent = 'Please select a gender';
        isValid = false;
      } else {
        document.getElementById('gendererror').textContent = '';
      }
   
      return isValid;
}

//Insert new records

function insertRecord(data) {

        //checking duplicate records
        let count=0;
        console.log("data",data.employee_id);
        const firstMatch = ids.map((emp) =>{
            if(emp.employee_id === data.employee_id){
                count++;
            }
             
        });
        console.log("counting",count);
        if(count>=1){
                document.getElementById('error').textContent = 'You can not Assign same ID ';
                return;
        }else{


    var employee ={
        employee_id:data.employee_id,
        name:data.name,
        Age:data.Age,
        gender_id:data.gender_id
    }

    var id ={
        employee_id:data.employee_id,
    }

    data.push(employee)
    console.log(data);
    ids.push(id)
    console.log(ids);

    console.log(data.Age,data.employee_id,data.gender_id,data.name);


        var table =document.getElementById("storelist").getElementsByTagName('tbody')[0];
        // console.log("childres",rows.children[0].className);
        // if(rows.children[0].classList=="EmptyMsg"){
            
        // }
        console.log(table);
        var newRow = table.insertRow(table.length);
        console.log(newRow);
        var cell = newRow.insertCell(0);
            cell.innerHTML = data.employee_id;
        var cell = newRow.insertCell(1);
            cell.innerHTML = data.name;

        var cell = newRow.insertCell(2);
            cell.innerHTML = data.Age;
        var cell = newRow.insertCell(3);
            cell.innerHTML =data.gender_id;

        var cell = newRow.insertCell(4);
            cell.innerHTML =`<button class="button2" onClick="Edit_record(this)">Edit</button> 
            <button class="button3" onClick="delete_record(this)">Delete</button>`;
    }
    
}

//OnEdit function

//Delete Data
function delete_record(td) {

 if(confirm("If you want to delete ?")){

    console.log("wrong",td.parentElement);
    console.log("correct",td.parentElement.parentElement);
    rows=td.parentElement.parentElement;
   
    document.getElementById("storelist").deleteRow(rows.rowIndex)
    
    console.log(rows.children[0].textContent);//fetching current Employee ID
    id=rows.children[0].textContent
    deleIds.push(id);
    ids.pop(id);
    data.pop(id);
    ids.pop("id", data);
    console.log(" original id",ids);
    console.log("data",data);
    console.log("deleted",deleIds);


    // let rows =document.getElementById("table_data")
    // console.log(rows.children.length);
    // if(rows.children.length<=0){
    //     let newEmptyMsg =document.createElement("h3");
    //     newEmptyMsg.classList.add("EmptyMsg")
    //     newEmptyMsg.textContent = "Nothing is Here!! Please Enter the record";
    //     rows.appendChild(newEmptyMsg);
    // }
    
 }
 reser_data()
}



function isExist(id) {

    for(var i=0;i<data.length;i++){
            if(data[i].employee_id == id  || deleIds[i] == id ){
                console.log("for ids",data[i].employee_id,id);
                document.getElementById('error').textContent = 'Employee Id alredy Exist ';
                return true
            }else{
                document.getElementById('error').textContent = '';
            }
    }


    return false; 

}

//Edit_record 

function Edit_record(currElement) {

    sub_btn.textContent="update";
     
    selectedRow = currElement.parentElement.parentElement;


    document.getElementById("employee_id").value =selectedRow.cells[0].innerHTML;
    document.getElementById("name").value =selectedRow.cells[1].innerHTML;
    document.getElementById("Age").value =selectedRow.cells[2].innerHTML;
    document.getElementById("gender_id").value =selectedRow.cells[3].innerHTML;

    console.log(data);



}

function update_record(data){

    if(isExist(data)){
        return;
    }

    console.log("hhh",data);
    console.log("nn",data.employee_id);
        console.log("34",data);

    var index =null;
    for(var i=0;i<data.length;i++){
        if(ids[i].employee_id  == data.employee_id){
            index=i;
        }
    }

    data[index]=0;


    // console.log(selectedRow.cells[0]);

    for(var i=0;i<data.length;i++){
        if(data[i].employee_id == data.employee_id){
            document.getElementById('error').textContent = 'Employee Id alredy Exist ';
            return false
        } else{
            document.getElementById('error').textContent = '';
            selectedRow.cells[0].innerHTML =data.employee_id;
            selectedRow.cells[1].innerHTML =data.name;
            selectedRow.cells[2].innerHTML =data.Age;
            selectedRow.cells[3].innerHTML =data.gender_id;
            // }
        }
     }



}

//Reset data 

function reser_data() {
    document.getElementById("employee_id").value='';
    document.getElementById("name").value='';
    document.getElementById("Age").value='';
    document.getElementById("gender_id").value='';
    
}

function checkEmployeevalid(id) {
    
    //validate employee Ids
    const match = deleIds.includes(id);
    console.log("match",match);
    return match;
    
}



