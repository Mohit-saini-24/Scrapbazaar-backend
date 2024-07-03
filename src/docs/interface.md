## API Interface

### scrapCategory

-   Ferrous Scrap
-   Non-Ferrous Scrap
-   Electronic Scrap
-   Automotive Scrap
-   Construction and Demolition Scrap
-   Plastic Scrap
-   Paper and Cardboard Scrap
-   Glass Scrap
-   Rubber Scrap
-   Textile Scrap

### Ferrous Scrap Categories

-   Heavy Melting Scrap (HMS)
-   Plate and Structural (P&S)
-   Shredded Steel Scrap
-   Cast Iron Scrap
-   Bundled Scrap
-   Turnings and Borings
-   Busheling Scrap
-   Rails and OTM (Other Track Material)
-   Tin-Plated Steel Scrap
-   Wrought Iron Scrap

### Non ferrous category scrap

-   Aluminum Scrap
-   Copper Scrap
-   Brass Scrap
-   Lead Scrap
-   Zinc Scrap
-   Nickel Scrap
-   Tin Scrap
-   Stainless Steel Scrap
-   Titanium Scrap
-   Magnesium Scrap

### Registration

There can be two user profiles.

Buyer or Seller

Buyer can buy specific category scrap or anything.

endpoint : /api/registration

payload

```
{
    username:"",
    password:"",
    mobileNumber:"",
    email:"",
    role:<BUYER/SELLER>,
    scrapCategory:[],
    isIndustry:true/false,
    industryDetails:{
        companyName:"",
        gstin:"",
        companyAddress:"",
    },
    address:"",
    pincode:"",
    mobileNumberVerified:true/false
}
```

### Login

endpoint : /api/login

payload

```
{
    username:"",
    password:""
}
```

# Seller

## create scrap order

```
{
    qty : "",
    category:"Ferrous"
    subCategory:"",
    scrapLocation:"",
    contactPerson:{
        name:"",
        mobileNumber:""
    }
}
```

## Get scrap verified

-   QA will visit the location for scrap listing.
-   Provide certificate for quality.
-   Attach photos.
-   Digitally sign the certificate.
-   Upload the certificate for listing.

## List for sale

# Buyer

## See listing

-   certificate provided
-   certificate not provided

## offer price

## use own transportation

## use scrapbazaar transportation
