function populateUFs() {
    const ufSelect = document.querySelector('select[name=uf]')
    
    fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then( res => res.json())
      .then( states => {
        for (const state of states) {
          ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }
      })
  }
  
  populateUFs()
  
  function getCities(event) {
      const citySelect = document.querySelector("[name=city]")
      const stateInput = document.querySelector("[name=state]")
      
      const ufValue = event.target.value
  
      const indexOfSelectedState = event.target.selectedIndex
      stateInput.value = event.target.options[indexOfSelectedState].text
  
      const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

      citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
      citySelect.disabled = true
      
      fetch(url)
      .then( res => res.json())
      .then( cities => {
        
        for (const city of cities) {
          citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
  
        citySelect.disabled = false
      })
  }
  
  document.querySelector('select[name=uf]').addEventListener('change', getCities)

  //Itens de coleta=============================
  //pegar todos os LI's

  const itemsToColect = document.querySelectorAll(".items-grid li")

  for(const item of itemsToColect){
    item.addEventListener("click", handleSelectedItem)
  }
  const collectItems = document.querySelector("input[name=items]")

  let selectedItems = []

  function handleSelectedItem(event){
    const itemLi = event.target
    
    //Adicionar ou remover classe via java-script
    //O .Toggle ira automaticamente adicionar a classe em tal elemento e automaticamente retirar de outra
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    

    //Verificar se existem itens selecionados===========================================================================
    //se sim, pegar os itens

    const alreadySelected = selectedItems.findIndex( function(item) {
        const itemFound = item == itemId;
        return itemFound      //Isso sera true ou false
    })


    //Caso ja esteja selecionado, retirar da seleção=====================================================================
    if(alreadySelected != -1){  //Quando ele for diferente de Falso
        //Tirar da seleção
        const filteredItems = selectedItems.filter( function(item){
          const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        })
        
        selectedItems = filteredItems
    }

    //Se não estiver selecionado, adicionar à seleção=====================================================================
    else{  
        selectedItems.push(itemId)
    }
    console.log(selectedItems)
    //Atualizar o campo escondido com os dados selecionados

    collectItems.value = selectedItems
  }
