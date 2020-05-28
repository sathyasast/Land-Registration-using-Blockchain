import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content">
        <h1>Register Property</h1>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name1 = this.productNames.value
          const phoneno1 = this.productPhonenos.value.toString()
          const adhaarno1 = this.productAdhaarnos.value.toString()
          const surveyno1 = this.productSurveynos.value.toString()
          const plotno1 = this.productPlotnos.value.toString()
          const street1 = this.productStreets.value
          const city1 = this.productCitys.value
          this.props.propertyRegistry(name1, phoneno1, adhaarno1, surveyno1, plotno1, street1, city1)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productNames"
              type="text"
              ref={(input) => { this.productNames = input }}
              className="form-control"
              placeholder="enter name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPhonenos"
              type="text"
              ref={(input) => { this.productPhonenos = input }}
              className="form-control"
              placeholder="enter mobileno"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productAdhaarnos"
              type="text"
              ref={(input) => { this.productAdhaarnos = input }}
              className="form-control"
              placeholder="enter adhaarno"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productSurveynos"
              type="text"
              ref={(input) => { this.productSurveynos = input }}
              className="form-control"
              placeholder="enter surveyno"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPlotnos"
              type="text"
              ref={(input) => { this.productPlotnos = input }}
              className="form-control"
              placeholder="enter plotno"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productStreets"
              type="text"
              ref={(input) => { this.productStreets = input }}
              className="form-control"
              placeholder="enter street"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productCitys"
              type="text"
              ref={(input) => { this.productCitys = input }}
              className="form-control"
              placeholder="enter city"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Register Property</button>
        </form>
        <p>&nbsp;</p>
        <h2>Registered Property</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Phoneno</th>
              <th scope="col">Adhaarno</th>             
              <th scope="col">Surveyno</th>
              <th scope="col">Plotno</th>
              <th scope="col">Street</th>
              <th scope="col">City</th>
              <th scope="col">Owner</th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.registers.map((register, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{register.id.toString()}</th>
                  <td>{register.name1}</td>
                  <td>{register.phoneno1.toString()}</td>
                  <td>{register.adhaarno1.toString()}</td>
                  <td>{register.surveyno1}</td>
                  <td>{register.plotno1.toString()}</td>
                  <td>{register.street1}</td>
                  <td>{register.city1}</td>
                  <td>{register.owner}</td>
                </tr>
              )
            })} 
          </tbody> 
        </table>
        <p>&nbsp;</p>
        <h2>Add Property to sell</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name = this.productName.value
          const phoneno = this.productPhoneno.value
          const adhaarno = this.productAdhaarno.value
          const surveyno = this.productSurveyno.value
          const plotno = this.productPlotno.value
          const street = this.productStreet.value
          const city = this.productCity.value
          const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
          this.props.createProduct(name, phoneno, adhaarno, surveyno, plotno, street, city, price)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productName"
              type="text"
              ref={(input) => { this.productName = input }}
              className="form-control"
              placeholder="enter name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPhoneno"
              type="text"
              ref={(input) => { this.productPhoneno = input }}
              className="form-control"
              placeholder="enter mobileno"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productAdhaarno"
              type="text"
              ref={(input) => { this.productAdhaarno = input }}
              className="form-control"
              placeholder="enter adhaarno"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productSurveyno"
              type="text"
              ref={(input) => { this.productSurveyno = input }}
              className="form-control"
              placeholder="enter surveyno"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPlotno"
              type="text"
              ref={(input) => { this.productPlotno = input }}
              className="form-control"
              placeholder="enter plotno"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productStreet"
              type="text"
              ref={(input) => { this.productStreet = input }}
              className="form-control"
              placeholder="enter street"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productCity"
              type="text"
              ref={(input) => { this.productCity = input }}
              className="form-control"
              placeholder="enter city"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPrice"
              type="text"
              ref={(input) => { this.productPrice = input }}
              className="form-control"
              placeholder="enter Property value"
              required />
          </div>
          <button type="submit" className="btn btn-primary">Add Property</button>
        </form>
        <p>&nbsp;</p>
        <h2>Register Buyer</h2>
        <form onSubmit={(event) => {
          event.preventDefault()
          const name2 = this.productNamee.value
          const phoneno2 = this.productPhonenoe.value.toString()
          const adhaarno2 = this.productAdhaarnoe.value.toString()
          this.props.buyerProduct(name2, phoneno2, adhaarno2)
        }}>
          <div className="form-group mr-sm-2">
            <input
              id="productNamee"
              type="text"
              ref={(input) => { this.productNamee = input }}
              className="form-control"
              placeholder="enter name"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productPhonenoe"
              type="text"
              ref={(input) => { this.productPhonenoe = input }}
              className="form-control"
              placeholder="enter mobileno"
              required />
          </div>
          <div className="form-group mr-sm-2">
            <input
              id="productAdhaarnoe"
              type="text"
              ref={(input) => { this.productAdhaarnoe = input }}
              className="form-control"
              placeholder="enter adhaarno"
              required />
         </div>
          <button type="submit" className="btn btn-primary">Add Buyer</button>
        </form>
        
        <p>&nbsp;</p>
        <h2>Buy Property</h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Phoneno</th>
              <th scope="col">Adhaarno</th>             
              <th scope="col">Surveyno</th>
              <th scope="col">Plotno</th>
              <th scope="col">Street</th>
              <th scope="col">City</th>
              <th scope="col">Price</th>
              <th scope="col">Owner</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody id="productList">
            { this.props.products.map((product, key) => {
              return(
                <tr key={key}>
                  <th scope="row">{product.id.toString()}</th>
                  <td>{product.name}</td>
                  <td>{product.phoneno.toString()}</td>
                  <td>{product.adhaarno}</td>
                  <td>{product.surveyno}</td>
                  <td>{product.plotno}</td>
                  <td>{product.street}</td>
                  <td>{product.city}</td>
                  <td>{window.web3.utils.fromWei(product.price.toString(), 'Ether')} Eth</td>
                  <td>{product.owner}</td>
                  <td>
                    { !product.purchased
                      ? <button
                          name={product.id}
                          value={product.price}
                          onClick={(event) => {
                            this.props.purchaseProduct(event.target.name, event.target.value)
                          }}
                        >
                          Buy
                        </button>
                      : null
                    }
                    </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Main;