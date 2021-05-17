var selectedRow = null;
var updBtn = document.getElementById('updateBtn');
updBtn.disabled = true;
function onFormSubmit()
{
    var formData = readFormData();
    
    if(selectedRow == null)
    {
        insertNewRecord(formData);
    }
    else
    {
        updateRecord(formData);s
    }
    resetForm();
}
function readFormData()
{
    var formData = {};
    formData['name'] = document.getElementById('name').value;
    var male = document.getElementById('radioMale');
    var female = document.getElementById('radioFemale');
            if(male.checked == true)
                formData['gander'] = male.value;
            else if(female.checked == true)
                formData['gander'] = female.value;

    formData['age'] = document.getElementById('age').value;
    formData['city'] = document.getElementById('city').value;
    return formData;
}
function insertNewRecord(data)
{ 
    updBtn.disabled = false;   
    var table = document.getElementById('data-list').getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    var name1 = document.getElementById('name').value;
    var age1 = document.getElementById('age').value;
    var city1 = document.getElementById('city').value;
    if(name1.length >= 9 || name1.length < 1){
        alert("Name should niether be Null nor exceed 8"); 
        name1.focus();
        resetForm();
        return false;     
    }
    else if(age1 < 10 || age1 > 50){
        alert("Age Should be in 10 - 50");
        age1.focus();
        resetForm();
        return false;
    }
    else{
        cell1 = newRow.insertCell(0);
        cell1.innerHTML = name1;
        cell2 = newRow.insertCell(1);
        cell2.innerHTML = data.gander;
        cell3 = newRow.insertCell(2);
        cell3.innerHTML = age1;
        cell4 = newRow.insertCell(3);
        cell4.innerHTML = city1;
        cell5 = newRow.insertCell(4);
        cell5.innerHTML = `<a onClick="onEdit(this)" class="editAction">Edit</a> / <a onClick="onDelete(this)" class="removeAction">Remove</a>`;
    }
    resetForm();
}
function resetForm()
{
    document.getElementById('age').value = '';
    document.getElementById('name').value = '';
    document.getElementById('genderMale').value = '';
    document.getElementById('genderFemale').value = '';
    selectedRow = null;
}
function isNumber(evt){
    var ch = String.fromCharCode(evt.which);
    if(!(/[1-9]/.test(ch))){
        evt.preventDefault();
    }
}
function isChar(evt){
    var ch = String.fromCharCode(evt.which);
    if(!(/[A-Za-z]/.test(ch))){
        evt.preventDefault();
    }
}
function onEdit(td)
{
    selectedRow = td.parentElement.parentElement;
    
    if(selectedRow.cells[0].innerHTML.length > 8 || selectedRow.cells[0].innerHTML.length < 1){
        alert("Name should niether be Null nor exceed 8"); 
        selectedRow.cells[0].focus();
        resetForm();
        return false;
    }
    else if(selectedRow.cells[2].innerHTML < 10 || selectedRow.cells[2].innerHTML > 50){
        alert("Age Should be in 10 - 50");
        selectedRow.cells[2].focus();
        resetForm();
        return false;
    }
    else{
        document.getElementById('age').value = selectedRow.cells[2].innerHTML;
        document.getElementById('name').value = selectedRow.cells[0].innerHTML;
        document.getElementById('gander').value = selectedRow.cells[1].innerHTML;
        document.getElementById('city').value = selectedRow.cells[3].innerHTML;
    }  
}
function updateRecord(formData)
{
    if(formData.name.length > 8 || formData.name.length < 1){
        alert("Name should niether be Null nor exceed 8"); 
        formData.name.focus();
        resetForm();
        return false;
    }
    else if(formData.age < 10 || formData.age > 50){
        alert("Age Should be in 10 - 50");
        formData.age.focus();
        resetForm();
        return false;   
    }
    else{
        selectedRow.cells[0].innerHTML = formData.name;
        selectedRow.cells[1].innerHTML = formData.gander;
        selectedRow.cells[2].innerHTML = formData.age;
        selectedRow.cells[3].innerHTML = formData.city;
        selectedRow = null;  
    }
    
}
function onDelete(td)
{
    row = td.parentElement.parentElement;
    document.getElementById('data-list').deleteRow(row.rowIndex);
    resetForm();
}
