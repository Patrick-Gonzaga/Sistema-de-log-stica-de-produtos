let produtoArray = []
let id = 1

function cadastrarProduto() {
  let inputs = receberInputs()
  console.log(inputs)
  if (verificarInputs(inputs)) {
    produtoArray.push(inputs)
    id++
    console.log(produtoArray)
  }
  tableList(produtoArray)
  removeInputValue()
}

function receberInputs() {
  let nome = document.querySelector('#nome-produto').value
  let quantidade = document.querySelector('#input-quantidade').value
  let valor = document.querySelector('#preco').value
  let produto = criarProduto(id, nome, quantidade, valor)
  return produto
}

function criarProduto(id, nome, quantidade, valor) {
  return {
    id,
    nome,
    quantidade,
    valor
  }
}

function verificarInputs(inputs) {
  let msg = ''
  if (inputs.nome == '') {
    msg += '> Digite o nome do produto \n'
  }
  if (inputs.quantidade == '' || inputs.quantidade == 0) {
    msg += '> Digite a quantidade do produto \n'
  }
  if (inputs.valor == '' || inputs.valor == 0) {
    msg += '> Digite o valor do produto \n'
  }
  if (msg != '') {
    alert(msg)
    return false
  }
  if (msg == '') {
    return true
  }
}

function tableList(array) {
  let tbody = document.querySelector('#tbody')
  tbody.innerText = ''
  for (let i = 0; i < array.length; i++) {
    let newRow = tbody.insertRow()

    let tdId = newRow.insertCell()
    let tdNome = newRow.insertCell()
    let tdQuantidade = newRow.insertCell()
    let tdValor = newRow.insertCell()
    let tdAcoes = newRow.insertCell()
    let imgEdit = document.createElement('img')
    let imgRemove = document.createElement('img')

    tdId.innerText = array[i].id
    tdNome.innerText = array[i].nome
    tdQuantidade.innerText = array[i].quantidade
    tdValor.innerText = array[i].valor

    imgEdit.src = 'img/edit.ico'

    tdAcoes.appendChild(imgEdit)

    imgRemove.src = 'img/remove.ico'

    tdAcoes.appendChild(imgRemove)

    imgRemove.setAttribute('onclick', `removeItem(${array[i].id})`)

    imgRemove.classList = 'button-acoes'

    imgEdit.style.cursor = 'pointer'

    imgEdit.setAttribute('onclick', `abrirEditProd(${array[i].id})`)
  }
}

let filtredArray = produtoArray

function filtrar() {
  filtredArray = produtoArray
  let inputSearch = document.querySelector('.input-search')

  filtredArray = filtredArray.filter(obj => {
    return obj.nome.includes(inputSearch.value)
  })
  console.log(produtoArray)
  console.log(filtredArray)

  tableList2(filtredArray)
}

let button_filter = document.querySelector('.button-filter-a')
button_filter.onclick = filtrar

function removeItem(id) {
  let tbody = document.querySelector('#tbody')
  for (let i = 0; i < produtoArray.length; i++) {
    if (produtoArray[i].id == id) {
      alert(`O produto ${produtoArray[i].nome} foi removido`)
      produtoArray.splice(i, 1)
      tbody.deleteRow(i)
    }
  }
}

//GAMBI

function tableList2(array) {
  let tbody = document.querySelector('#tbody')
  tbody.innerText = ''
  for (let i = 0; i < array.length; i++) {
    let newRow = tbody.insertRow()

    let tdId = newRow.insertCell()
    let tdNome = newRow.insertCell()
    let tdQuantidade = newRow.insertCell()
    let tdValor = newRow.insertCell()
    let tdAcoes = newRow.insertCell()
    let imgEdit = document.createElement('img')
    let imgRemove = document.createElement('img')

    tdId.innerText = array[i].id
    tdNome.innerText = array[i].nome
    tdQuantidade.innerText = array[i].quantidade
    tdValor.innerText = array[i].valor

    imgEdit.src = 'img/edit.ico'

    tdAcoes.appendChild(imgEdit)

    imgRemove.src = 'img/remove.ico'

    tdAcoes.appendChild(imgRemove)

    imgRemove.setAttribute('onclick', `removeItem2(${array[i].id})`)

    imgEdit.style.cursor = 'pointer'

    imgEdit.setAttribute('onclick', `abrirEditProd(${array[i].id})`)
  }
}

function removeItem2(id) {
  let tbody = document.querySelector('#tbody')
  for (let i = 0; i < filtredArray.length; i++) {
    if (filtredArray[i].id == id) {
      let indexProdutoFiltred = produtoArray.indexOf(filtredArray[i])
      alert(`O produto "${filtredArray[i].nome}" foi removido`)
      filtredArray.splice(i, 1)
      produtoArray.splice(indexProdutoFiltred, 1)
      tbody.deleteRow(i)
    }
  }
}

//FIM GAMBI

function removeInputValue() {
  document.querySelector('#nome-produto').value = ''
  document.querySelector('#input-quantidade').value = ''
  document.querySelector('#preco').value = ''
}

function abrirEditProd(id) {
  document.querySelector('.container-editar-produtos').style.display = 'flex'
  buttonEdit.setAttribute('onclick', `editarProduto(${id})`)
}

function editarProduto(id) {
  for (let i = 0; i < produtoArray.length; i++) {
    if (produtoArray[i].id == id) {
      let new_nome = document.querySelector('#input-editar-nome').value
      let new_quantidade = document.querySelector(
        '#input-editar-quantidade'
      ).value
      let new_valor = document.querySelector('#input-editar-valor').value
      let newProduto = {
        id: id,
        nome: new_nome,
        quantidade: new_quantidade,
        valor: new_valor
      }
      console.log(newProduto)
      if (verificarInputs(newProduto)) {
        produtoArray[i].nome = new_nome

        produtoArray[i].quantidade = new_quantidade

        produtoArray[i].valor = new_valor

        tableList(produtoArray)

        document.querySelector('.container-editar-produtos').style.display =
          'none'

        document.querySelector('#input-editar-nome').value = ''
        document.querySelector('#input-editar-quantidade').value = ''
        document.querySelector('#input-editar-valor').value = ''
      }
    }
  }
}
let buttonEdit = document.querySelector('.edit-button')

let button_apagar = document.querySelector('.button-apagar')
button_apagar.onclick = removeInputValue

function apagarFiltro() {
  tableList(produtoArray)
}

let buttonApagarFiltro = document.querySelector('.button-apagar-filtro')
buttonApagarFiltro.onclick = apagarFiltro
