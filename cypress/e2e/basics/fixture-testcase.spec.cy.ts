
describe('test fixture', ()=>{
    //globale variable
    let queryData;
    before(function (){
        cy.fixture('authcodeRequestPayload').then(function (queryData){
            //add data to global, so that we can use it in every test
            this.queryData = queryData;
        })
    })

   /* it('should call fixture data', () => {
        cy.visit('http://localhost:3100/dashboard');
        const options = {
            method: 'POST',
            url:'authEndpoint',
            qs: queryData,
        }

        cy.request(options).then((res)=>{
                expect(res.status).to.eq(200)
                console.log(res)
            }
        )
    });*/
})

