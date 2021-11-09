
const makeBreadList = templater((o)=>`
<div class="breadlist-item">
	<a href="#page-bread-profile" class="display-flex data-id="${o.id}">
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