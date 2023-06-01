function search() {
    const keywordInput = document.getElementById('keyword-input');
    const keyword = keywordInput.value;
  
    fetch(`/search?keyword=${keyword}`)
      .then(response => response.json())
      .then(data => {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
  
        if (data.length === 0) {
          resultsDiv.innerText = 'Nenhum resultado encontrado.';
        } else {
          data.forEach(url => {
            const link = document.createElement('a');
            link.href = url;
            link.textContent = url;
            resultsDiv.appendChild(link);
          });
        }
      })
      .catch(error => {
        console.error('Ocorreu um erro na pesquisa:', error);
      });
  }
  