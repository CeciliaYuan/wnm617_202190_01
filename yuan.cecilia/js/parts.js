
const makeBreadList = templater((o)=>`
<div class="breadlist-item">
	<a href="#page-bread-profile" class="display-flex bread-jump" data-id="${o.id}">
        <div class="flex-none breadlist-item-image">
            <img src="${o.img}" alt="">
        </div>
            <div class="flex-stretch breadlist-item-body ">
               <div class="breadlist-item-name">Name : ${o.name}</div>
               <div class="breadlist-item-bakery">Bakery : ${o.bakery}</div>
               <div class="breadlist-item-tag">Tag : ${o.tag}</div>
            </div>
            
    </a>
</div>

`);

const makeUserProfile = templater((o)=>`
    <div class="user-info">
        <div class="user-img"><img src="${o.img}" alt="user_imgae"></div>
        <div class="user-name">
            <h1 style="color: var(--color-main-dark);">${o.name}</h1>
            <p style="color: var(--color-main-light);">${o.username}</p>
            <p style="color: var(--color-main-light);">${o.email}</p>
        </div> 
        <div class="floater right"><a href="#"  data-activate="#list-modal10"><i class="fa fa-cog fa-lg"></i></a></div>
              <!-- source from https://www.emojisky.com/desc/8475 --> 
    </div>
`);

// const makeBreadProfile = templater((o)=>`
//      <div class="display-flex">
//         <div class="bread-image">
//             <img src="${o.img}">
//         </div>
//     </div>
//     <div class="bread-info">
//         <div class="display-flex bread-info-name">
//             <h1>${o.name}</h1>
//             <h4>${o.tag}</h4>
//         </div>
//             <h3 data-role="none">Bakery :${o.bakery}</h3>
            
//         </div>
//         <p>${o.date_create}</p>
//         <p>${o.description}</p>
//     </div>

// `);

const makeBreadPopup = o => `
<div class="display-flex bread-jump" data-id="${o.bread_id}">
   <div class="flex-none bread-popup-image">
      <img src="${o.img}" alt="">
   </div>
   <div class="flex-stretch bread-popup-body padding-md">
      <div class="breadlist-item-name">Name : ${o.name}</div>
      <div class="breadlist-item-popup-bakery">Bakery : ${o.bakery}</div>
      <div class="breadlist-item-popup-tag">Tag : ${o.tag}</div>
   </div>
</div>
`;

const FormControlInput = ({namespace,name,displayname,type,placeholder,value}) => `
<div class="form-control">
   <label for="${namespace}-${name}" class="form-label"></label>
   <input type="${type}" id="${namespace}-${name}" class="form-input" data-role="none" placeholder="" value="${value}">
</div>
`;

const FormControlTextarea = ({namespace,name,displayname,placeholder,value}) => `
<div class="form-control">
   <label for="${namespace}-${name}" class="form-label"></label>
   <textarea id="${namespace}-${name}" class="form-input" data-role="none" placeholder="${placeholder}">${value}</textarea>
</div>
`;



const makeBreadFormInputs = (o,namespace) => `
${FormControlInput({
   namespace:namespace,
   name:"name",
   // displayname:"Name",
   type:"text",
   placeholder:"Type The Bread Name",
   value:o.name
})}

${FormControlInput({
   namespace:namespace,
   name:"bakery",
   // displayname:"bakery",
   type:"text",
   placeholder:"Type The Bread Bakery",
   value:o.bakery
})}
${FormControlTextarea({
   namespace:namespace,
   name:"description",
   // displayname:"Description",
   placeholder:"Type The Bread Description",
   value:o.description
})}
`;



const makeUserFormInputs = (o,namespace) => `
${FormControlInput({
   namespace:namespace,
   name:"name",
   displayname:"Name",
   type:"text",
   placeholder:"Type The User Name",
   value:o.name
})}
${FormControlInput({
   namespace:namespace,
   name:"username",
   displayname:"Type",
   type:"text",
   placeholder:"Type The User Handle",
   value:o.username
})}
${FormControlInput({
   namespace:namespace,
   name:"username",
   displayname:"Type",
   type:"text",
   placeholder:"Type The User Email",
   value:o.email
})}

`;