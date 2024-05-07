const labels = [
    '2017-18',
    '2018-19',
    '2019-20',
    '2020-21',
    '2021-22',
    '2022-23'
    
];
const xhr = new XMLHttpRequest();
xhr.open("get", "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-principaux-diplomes-et-formations-prepares-etablissements-publics/records?limit=20&refine=etablissement_actuel_lib%3A%22Universit%C3%A9%20de%20Tours%22&refine=sect_disciplinaire_lib%3A%22Sciences%20de%20la%20vie%22&refine=diplome_rgp%3A%22Licence%22&refine=niveau_lib%3A%222%C3%A8me%20ann%C3%A9e%22");
xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
        const reponse = JSON.parse(xhr.responseText);
        const donnees = reponse.results;
        const somme=[]
       const hoes=[]
       const femmes =[]
    for (const i of donnees ){
        const j=labels.indexOf(i.annee_universitaire)
        
            somme[j]=i.effectif_total
            hoes[j]=i.hommes
            femmes[j]=i.femmes

    
    }


    const data = {
        labels: labels,
        datasets: [{
            label: 'étudiants inscrits en Sciences de la vie à l\'Université de TOURS licence 2',
            backgroundColor: 'rgb(0, 199, 193)',
            borderColor: 'rgb(0, 199, 193)',
            data: somme,
        }]
    };
    
    const config = {
        type: 'bar',
        data: data,
        options: {}
    };

    
    const myChart = new Chart(
        document.querySelector('#moncanvas'),
        config
    );

    const data2= {     
        labels: labels, 
        datasets:
         [{       
            label: 'etudiantes femmes inscrites en Sciences de la vie',     
            backgroundColor: 'rgb(0, 199, 193)',       
            borderColor: 'rgb(0, 199, 193)',      
            data: femmes ,
    
         },
         {    
            label: 'étudiants hommes inscrits en Sciences de la vie',
            backgroundColor: 'rgb(255, 0, 0)',       
            borderColor: 'rgb(255, 0, 0)',         
            data: hoes,
                
         }
        ]     
        };
         
         const config2 = {   
              type: 'line',     
              data: data2,     
              options: {}  
             };
             
    
    const myChart2 = new Chart(    
        document.querySelector('#mon'),     
        config2   );

const dataRatio = [];
for (let i = 0; i < labels.length; i++) {
    const ratio = femmes[i] / hoes[i];
    dataRatio[i] = ratio;
}

    const dataR= {     
            labels: labels, 
            datasets:
             [{       
                label: 'etudiants femmes/hommes inscrits en science de la vie',     
                backgroundColor: 'rgb(0, 199, 193)',       
                borderColor: 'rgb(0, 199, 193)',      
                data: dataRatio ,
        
             },
             
            ]     
            };
             
             const config3 = {   
                  type: 'line',     
                  data: dataR,     
                  options: {}  
                 };
                 
        
        const myChart3 = new Chart(    
            document.querySelector('#mi'),     
            config3   );
    
    }

    
};
xhr.send();

