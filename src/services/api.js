import axios from "axios";
const Base_Url2= "https://online.tusmer.com/api";
const Base_Url= "https://api.tusmer.com";
const GetToken= "/api-frontend/Authenticate/GetToken";
const CreateUserEndPoint= "/api-frontend/Customer/Register";
const GetSubCategoriesEndPoint= "/api-frontend/Catalog/GetCatalogSubCategories/";
const GetCategoryProductsEndPoint= "/api-frontend/Catalog/GetCategoryProducts/";
const RegisterUrl = "/user/TusmerFreeRegister";
const UniversitiesEndPoint = "/user/GetUniversities";
const Login= "/user/LoginForTusmerFree";
const Categories="/lecture/gettusmerfreelecturegroups";
const Topic= "/api-frontend/Topic/GetTopicDetailsBySystemName/";
let _token= "";

export async function getToken(username, password)
{
    const response= await axios.post(
        Base_Url+GetToken,
        {
            "is_guest": username.length == 0,
            "username": username,
             "password": password
        }
        );
        if(response.data.token)
            _token= response.data.token;
}


export async function userLogin(username, password)
{
    if(_token.length == 0)
    {
        await getToken("", "");
    }
    const response= await axios.post(
        Base_Url2+Login,
        {
            "email": username,
             "password": password
        }
        );
        console.log("user Login start");
        console.log(response);
    const result = response.data;
    return result; 
}

export async function userRegister(credentials)
{
    console.log("userRegister");
    let {emailId, mobileNumber, password, firstName, lastName, customerRoleId, university, studentClass}= credentials;
    emailId= emailId.trim();
    password = password.trim();
    if(_token.length == 0)
    {
        await getToken("", "");
    }
    const config = {
        headers: { Authorization: `Bearer ${_token}` }
    }
        const response= await axios.post(
            Base_Url2+RegisterUrl,
            {
                "email": mobileNumber,
                "phone": mobileNumber,
                 "password": password,
                 "firstName":firstName,
                 "lastName":lastName,
                 "customerRoleId":customerRoleId,
                 "universityId": university,
                 "schoolTermId": studentClass
            }
            );
    
}

export async function fetchUniversities()
{
    const response = await axios.get(
        Base_Url2+UniversitiesEndPoint
    )
    const result = response.data;
    return result.data;
}
export async function getSubCategories(categoryId, token)
{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    const response= await axios.get(
        Base_Url+GetSubCategoriesEndPoint+categoryId,config
    );

    return response.data;
}

export async function getProducts(categoryId, token)
{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const response= await axios.post(
        Base_Url+GetCategoryProductsEndPoint+categoryId,{},config
    );
    const result = response.data
    return result.catalog_products_model.products;
}

export function getCategories(userId)
{
    
    // console.log(userId);
    // const response= await axios.post(
    //     Base_Url2+Categories,
    //     {
    //         "UserId": userId,
    //     }
    //     );
    // const result = response.data.data;

    // return result; 
}

export async function getTopic(systemName)
{
    await getToken("", "");
    const config = {
        headers: { Authorization: `Bearer ${_token}` }
    }

    const response= await axios.get(
        Base_Url+Topic+systemName,config
    );
    return response.data;
}