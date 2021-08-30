const callInfo = () => {

    const inputFeild = document.getElementById('input-feild');
    const inputValue = inputFeild.value;
    inputFeild.value = ''
    if (inputValue == '') {
        const searchResult = document.getElementById('search-result');
        searchResult.innerText = '';
        document.getElementById('empty-box').style.display = 'block';
    }
    else {
        document.getElementById('empty-box').style.display = 'none';
        // console.log(inputValue);
        const url = `https://api.covid19api.com/total/country/${inputValue}
    `;

        fetch(url)
            .then(res => res.json())
            .then(data => displayInfo(data[data.length - 1]))
            .catch(error => displayError(error));

    }

    const displayError = error => {
        document.getElementById('wrong-type').style.display = 'block';
    }

}

const displayInfo = data => {
    document.getElementById('wrong-type').style.display = 'none';
    const searchResult = document.getElementById('search-result');
    searchResult.innerText = '';


    // console.log(data);
    // displaying data
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
            <h2 class="mb-3">${data.Country}</h2>
        <table class="table text-white">
            <tbody>
                <tr class="bg-secondary">
                    <th scope="row">Active Cases</th>
                    <td>${data.Active}</td>
                </tr>
                <tr class="bg-success">
                    <th scope="row">Confirmed Cases</th>
                    <td colspan="2">${data.Confirmed}</td>
                </tr>
                <tr class="bg-danger">
                    <th scope="row">Total Deaths</th>
                    <td>${data.Deaths}</td>
                </tr>
                <tr class="bg-info">
                    <th scope="row">Last Updated</th>
                    <td>${data.Date}</td>
                </tr>
                
            </tbody>
        </table>`;
    searchResult.appendChild(div);



}