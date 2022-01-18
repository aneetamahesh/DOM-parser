const state = {
    xmlDocObj:null,
    nodes:['player_name','sport_id','specialisation','join_date','salary','address','contact_no']
}


const loadXml = () => {
    let xhttp;
    if(window.XMLHttpRequest){
        xhttp = new XMLHttpRequest();
    }else{
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhttp.onreadystatechange = function(){
        if(xhttp.readyState == 4 && xhttp.status == 200){
            showTable(xhttp.responseXML)
        }
    }

    xhttp.open('GET','PLAYER_MANAGEMENT.xml',true);
    xhttp.send();
}

const showTable = (xmlRes) => {
    if(!xmlRes){return;}
    state.xmlDocObj = xmlRes;
    let table;
    table = `<tr style='background:#36304a;color:#fff;'>
        <th>player_name</th>
        <th>sport_id</th>
        <th>specialisation</th>
        <th>join_date</th>
        <th>salary</th>
        <th>address</th>
        <th>contact_no</th>
        <th>Actions</th>
        </tr>`;
    const x = xmlRes.getElementsByTagName("player");
    for(let i=0;i<x.length;i++){
        table += `<form onsubmit="submitFormHandler()">
        <tr>
            <td>${xmlRes.getElementsByTagName("player_name")[i].childNodes[0].nodeValue}</td>
            <td>${xmlRes.getElementsByTagName("sport_id")[i].childNodes[0].nodeValue}</td>
            <td>${xmlRes.getElementsByTagName("specialisation")[i].childNodes[0].nodeValue}</td>
            <td>${xmlRes.getElementsByTagName("join_date")[i].childNodes[0].nodeValue}</td>
            <td>${xmlRes.getElementsByTagName("salary")[i].childNodes[0].nodeValue}</td>
            <td>${xmlRes.getElementsByTagName("address")[i].childNodes[0].nodeValue}</td>
            <td>${xmlRes.getElementsByTagName("contact_no")[i].childNodes[0].nodeValue}</td>
            <td id='edit_delete_cont_${i}'>
                <ion-icon name="pencil-outline" class="edit_icon" onclick="changeNode(${i})"></ion-icon>
                <ion-icon onclick="removeNode(${i})" name="trash-outline" class="delete_icon"></ion-icon>
            </td>
            <td id='submit_cancel_cont_${i}' class='hide'>
                <input type=submit><ion-icon type='submit' name="arrow-forward-circle-outline" class="edit_icon" style="color:green;"></ion-icon></submit>
                
                <ion-icon class="delete_icon" name="close-circle-outline"></ion-icon>
            </td>
            </tr>
        </form>`;
    }
    document.getElementById("member_table").innerHTML = table;
}

const removeNode = (id) => {
    if(id == null){return}
    let child = state.xmlDocObj.getElementsByTagName('player')[id];
    state.xmlDocObj.documentElement.removeChild(child);
    showTable(state.xmlDocObj)
}

const changeNode = (id) => {
    if(id == null){return}
    document.getElementById("form_cont").classList.toggle('hide');
    const form = document.getElementById("changeForm");
    let formElem = `
    <input disabled class='input_fields' type='text' placeholder='Player Name' value='${state.xmlDocObj.getElementsByTagName("player_name")[id].childNodes[0].nodeValue}'/>
    <input disabled class='input_fields' type='text' placeholder='Sport Id' value='${state.xmlDocObj.getElementsByTagName("sport_id")[id].childNodes[0].nodeValue}'/>
    <input class='input_fields' type='text' placeholder=Specialisation' value='${state.xmlDocObj.getElementsByTagName("specialisation")[id].childNodes[0].nodeValue}'/>
    <input class='input_fields' type='text' placeholder='Join Date' value='${state.xmlDocObj.getElementsByTagName("join_date")[id].childNodes[0].nodeValue}'/>
    <input class='input_fields' type='text' placeholder='Salary' value='${state.xmlDocObj.getElementsByTagName("salary")[id].childNodes[0].nodeValue}'/>
    <input class='input_fields' type='text' placeholder='Address' value='${state.xmlDocObj.getElementsByTagName("address")[id].childNodes[0].nodeValue}'/>
    <input class='input_fields' type='text' placeholder='Contact No' value='${state.xmlDocObj.getElementsByTagName("contact_no")[id].childNodes[0].nodeValue}'/>
    <div class='btn_cont'>
        <button class='submit_btn' type='submit' onclick='submitFormHandler(${id})'>Submit</button>
        <button class='cancel_btn' onclick='cancelFormHandler()'>Cancel</button>
    </div>
    `;

    form.innerHTML = formElem;
    
}



const submitFormHandler = (id) => {
    event.preventDefault();
    const inputFields = document.getElementsByClassName("input_fields");
    state.xmlDocObj.getElementsByTagName("plauyer_name")[id].childNodes[0].nodeValue = inputFields[0].value;
    state.xmlDocObj.getElementsByTagName("sport_id")[id].childNodes[0].nodeValue = inputFields[1].value;
    state.xmlDocObj.getElementsByTagName("specialisation")[id].childNodes[0].nodeValue = inputFields[2].value;
    state.xmlDocObj.getElementsByTagName("join_date")[id].childNodes[0].nodeValue = inputFields[3].value;
    state.xmlDocObj.getElementsByTagName("salary")[id].childNodes[0].nodeValue = inputFields[4].value;
    state.xmlDocObj.getElementsByTagName("address")[id].childNodes[0].nodeValue = inputFields[5].value;
    state.xmlDocObj.getElementsByTagName("contact_no")[id].childNodes[0].nodeValue = inputFields[6].value;
    console.log(inputFields[0].value)
    showTable(state.xmlDocObj)
    cancelFormHandler();
}

const cancelFormHandler = () => {
    event.preventDefault();
    document.getElementById("form_cont").classList.toggle('hide');

}

const addNewFormHandler = () => {
    event.preventDefault();
    document.getElementById("form_cont").classList.toggle('hide');
    document.getElementById("form_heading").innerHTML = "Add new node"
    const form = document.getElementById("changeForm");
    let formElem = `
    <input class='input_fields' type='text' placeholder='player_name' value=''/>
    <input class='input_fields' type='text' placeholder='sport_id' value=''/>
    <input class='input_fields' type='text' placeholder='pecialisatio' value=''/>
    <input class='input_fields' type='text' placeholder='join_date' value=''/>
    <input class='input_fields' type='text' placeholder='salary' value=''/>
    <input class='input_fields' type='text' placeholder='address' value=''/>
    <input class='input_fields' type='text' placeholder='contact_no' value=''/>
    <div class='btn_cont'>
        <button class='submit_btn' type='submit' onclick='addNewNodeHandler()'>Submit</button>
        <button class='cancel_btn' onclick='cancelFormHandler()'>Cancel</button>
    </div>
    `;

    form.innerHTML = formElem;
}

const addNewNodeHandler = () => {
    event.preventDefault();
    const inputFields = document.getElementsByClassName("input_fields");
    const newnode = state.xmlDocObj.createElement("player")
    state.nodes.map((el,i) => {
        let newTitle = state.xmlDocObj.createElement(el)
        let newText = state.xmlDocObj.createTextNode(inputFields[i].value)
        newTitle.appendChild(newText)
        newnode.appendChild(newTitle);
    });

    state.xmlDocObj.documentElement.insertBefore(newnode,null)
    showTable(state.xmlDocObj)
    cancelFormHandler()
}

loadXml();



