
const submitBtn = document.getElementById("submitBtn")
const walletInput = document.getElementById("walletAddressInput")
const addType = document.getElementById("addressTypeInput")
const detailsForm = document.getElementById("mForm")
const resultCount = document.getElementById("results-count")
const resultContainer = document.getElementById("results-container")
const resultsDiv = document.getElementById("results-div")

detailsForm.addEventListener("submit", async (e)=> {
    e.preventDefault()
    if( walletInput.value === null || addType === null) return alert("please fill the form correctly")
    let request = await fetch(`https://hook.us1.make.com/vf4oaoo6kririv7m7gmj0aucmvoahph5?address=${walletInput.value}&typeSelection=${addType.value}`)
    let response = await request.json()
    let filteredData = response.filter((d) => {if (d.file_url) return d})
   
   
    console.log(response)
    // if (!response.error) {
        resultCount.value = response.length
        console.log(filteredData)
        for(i = 0; i < filteredData.length; i++) {
            if ((filteredData[i].cached_file_url || filteredData[i].file_url) && (filteredData[i].cached_file_url?.includes('.mp4' || '.mkv') || filteredData[i].file_url?.includes('mp4' || 'mkv'))) continue
             resultsDiv.innerHTML += `
                <div class="card cardv col-2" id="${i}">
                <img class="card-img-top" src="${filteredData[i].cached_file_url || filteredData[i].file_url}" alt="${filteredData[i].name} image">
                <h5 class="card-title">${filteredData[i].name}</h5>
                <div class="card-body" >
                  <p class="card-text" >${filteredData[i].description.slice(0,250)}/p>
                </div>
              </div>
            `
        }
        

        // resultContainer.className = "data-show" ? "data-hide" : "data-show"
    }
)