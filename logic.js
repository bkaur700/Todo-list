let arrr = []
arrr = localStorage.getItem("TODO") ? JSON.parse(localStorage.getItem("TODO")) : []
arrr.map(item => show(item, false))

let display = document.getElementById("input1")
function add() {
  if (!input1.value || !input1.value.trim()) {
    alert('Please enter somthing')
  }
  else {
    let userdata = input1.value.trim()
    let obj = {
      value: userdata,
      isChecked: false
    }
    arrr.push(obj)
    show(obj, true)
  }
}

function keypress(e) {
  console.log(e.key)
  if (e.key == "Enter") {
    add()
  }
}

function show(obj) {
  
  let elements = ["div", "input", "label", "div", "button", "button"].map((item) => document.createElement(item))
  console.log(elements)
  // destructuring the elements
  let [outerdiv, inputcheck, label1, innerdivin, delbtn, editbtn] = elements
  inputcheck.type = "checkbox"
  inputcheck.checked = obj.isChecked
  inputcheck.checked ? label1.className = "strikeline" : ""

  label1.innerText = `${obj.value}`
  localStorage.setItem("TODO", JSON.stringify(arrr))
  delbtn.innerHTML = '<i class="fa-solid fa-trash"></i>'
  editbtn.innerHTML = '<i class="fa-solid fa-pen-to-square"></i>'
  innerdivin.append(delbtn, editbtn)
  innerdivin.classList.add("buttondiv")
  outerdiv.append(inputcheck, label1, innerdivin)
  outerdiv.classList.add("outerdiv")
  document.getElementById("tasklist").appendChild(outerdiv)
  input1.value = ""
  delbtn.onclick = () => {
    outerdiv.remove()
    arrr = arrr.filter((itme) => {
      return itme.value != obj.value
    })
    localStorage.setItem("TODO", JSON.stringify(arrr))
  }
  editbtn.onclick = () => {
    arrr = arrr.filter((itme) => {
      return itme.value != obj.value
    })
    input1.value = obj.value
    outerdiv.remove()
  }

  inputcheck.onchange = () => {
    arrr = arrr.map((item) => {
      if (item.value == obj.value) {
        return { value: obj.value, isChecked: inputcheck.checked }
      } else {
        return item
      }
    })
    localStorage.setItem("TODO", JSON.stringify(arrr))


    if (inputcheck.checked) {
      label1.classList.add("strikeline")
    } else {
      label1.classList.remove("strikeline")
    }
  }
}
