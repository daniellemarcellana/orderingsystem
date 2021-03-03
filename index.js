const formdata = $("#formdata");
const tabledata = $("#tabledata");


formdata.on('submit', (e) => {
    e.preventDefault();

    db.collection('dbOrders').add({
        customerName: $("#customerName").val(),
        contactNumber: $("#contactNumber").val(),
        email: $("#email").val(),
        item: $("#item").val(),
        qty: $("#qty").val(),
        amount: $("#amount").val(),
        deliveryMethod: $("#deliveryMethod").val(),
        deliveryAddress: $("#deliveryAddress").val(),
        deliveryTime: $("#deliveryTime").val()
    })
    $("#customerName").val("");
    $("#contactNumber").val("");
    $("#email").val("");
    $("#item").val("");
    $("#qty").val("");
    $("#amount").val("");
    $("#deliveryMethod").val("");
    $("#deliveryAddress").val("");
    $("#deliveryTime").val("");
    
})


function render(doc) {
    tabledata.append(`<tr id="${doc.id}"> 
    <td>${doc.data().customerName}</td>
    <td>${doc.data().contactNumber}</td>
    <td>${doc.data().email}</td>
    <td>${doc.data().item}</td>
    <td>${doc.data().qty}</td>
    <td>${doc.data().amount}</td>
    <td>${doc.data().deliveryMethod}</td>
    <td>${doc.data().deliveryAddress}</td>
    <td>${doc.data().deliveryTime}</td>
    </tr>`)
}

db.collection('dbOrders').orderBy('customerName').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == "added") {
            render(change.doc)
        }
    })
})