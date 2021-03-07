let SessionLoad = 1
let s:so_save = &so | let s:siso_save = &siso | set so=0 siso=0
let v:this_session=expand("<sfile>:p")
silent only
cd ~/Code/balance-tracker-vue-firebase-typescript-tailwind
if expand('%') == '' && !&modified && line('$') <= 1 && getline(1) == ''
  let s:wipebuf = bufnr('%')
endif
set shortmess=aoO
badd +1 ~/Code/balance-tracker-vue-firebase-typescript-tailwind
badd +2 src/firebase/config.js
badd +28 tsconfig.json
badd +44 src/router/index.ts
badd +35 src/views/Home.vue
badd +133 src/components/SignupForm.vue
badd +113 src/components/LoginForm.vue
badd +4 src/main.ts
badd +33 src/composables/useSignup.ts
badd +27 src/components/Navbar.vue
badd +6 firestore.rules
badd +79 src/composables/getCollection.ts
badd +2 src/components/MemberAccountsTable.vue
badd +53 src/composables/useDocument.ts
badd +68 src/composables/getDocument.ts
badd +82 src/components/AddAccount.vue
badd +1 src/components/AccountDetailsHeader.vue
badd +1 src/components/AccountDetailsRow.vue
badd +1 src/composables/useCollection.ts
badd +90 src/components/AccountDetailsStatsCard.vue
badd +161 src/views/AddTransaction.vue
badd +1 src/components/DeleteMember.vue
badd +0 src/components/AddAccountModal.vue
badd +69 src/components/DeleteAccountModal.vue
badd +0 term://.//15361:npm\ run\ serve
argglobal
%argdel
$argadd ~/Code/balance-tracker-vue-firebase-typescript-tailwind
set stal=2
edit src/components/AddAccountModal.vue
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 80 + 83) / 166)
exe 'vert 2resize ' . ((&columns * 83 + 83) / 166)
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 1 - ((0 * winheight(0) + 30) / 60)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
lcd ~/Code/balance-tracker-vue-firebase-typescript-tailwind
wincmd w
argglobal
if bufexists("~/Code/balance-tracker-vue-firebase-typescript-tailwind/src/components/MemberAccountsTable.vue") | buffer ~/Code/balance-tracker-vue-firebase-typescript-tailwind/src/components/MemberAccountsTable.vue | else | edit ~/Code/balance-tracker-vue-firebase-typescript-tailwind/src/components/MemberAccountsTable.vue | endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 9 - ((8 * winheight(0) + 30) / 60)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
9
normal! 09|
lcd ~/Code/balance-tracker-vue-firebase-typescript-tailwind
wincmd w
exe 'vert 1resize ' . ((&columns * 80 + 83) / 166)
exe 'vert 2resize ' . ((&columns * 83 + 83) / 166)
tabedit ~/Code/balance-tracker-vue-firebase-typescript-tailwind/src/views/AddTransaction.vue
set splitbelow splitright
wincmd _ | wincmd |
vsplit
1wincmd h
wincmd w
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
exe 'vert 1resize ' . ((&columns * 82 + 83) / 166)
exe 'vert 2resize ' . ((&columns * 83 + 83) / 166)
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 161 - ((29 * winheight(0) + 30) / 60)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
161
normal! 05|
lcd ~/Code/balance-tracker-vue-firebase-typescript-tailwind
wincmd w
argglobal
if bufexists("~/Code/balance-tracker-vue-firebase-typescript-tailwind/src/components/AccountDetailsStatsCard.vue") | buffer ~/Code/balance-tracker-vue-firebase-typescript-tailwind/src/components/AccountDetailsStatsCard.vue | else | edit ~/Code/balance-tracker-vue-firebase-typescript-tailwind/src/components/AccountDetailsStatsCard.vue | endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 119 - ((51 * winheight(0) + 30) / 60)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
119
normal! 018|
lcd ~/Code/balance-tracker-vue-firebase-typescript-tailwind
wincmd w
exe 'vert 1resize ' . ((&columns * 82 + 83) / 166)
exe 'vert 2resize ' . ((&columns * 83 + 83) / 166)
tabedit ~/Code/balance-tracker-vue-firebase-typescript-tailwind/src/components/DeleteAccountModal.vue
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 69 - ((32 * winheight(0) + 30) / 60)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
69
normal! 046|
lcd ~/Code/balance-tracker-vue-firebase-typescript-tailwind
tabedit ~/Code/balance-tracker-vue-firebase-typescript-tailwind/src/router/index.ts
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 13 - ((12 * winheight(0) + 30) / 60)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
13
normal! 0
lcd ~/Code/balance-tracker-vue-firebase-typescript-tailwind
tabnew
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
if bufexists("term://.//15361:npm\ run\ serve") | buffer term://.//15361:npm\ run\ serve | else | edit term://.//15361:npm\ run\ serve | endif
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
let s:l = 1 - ((0 * winheight(0) + 30) / 60)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
1
normal! 0
lcd ~/Code/balance-tracker-vue-firebase-typescript-tailwind
tabedit ~/Code/balance-tracker-vue-firebase-typescript-tailwind/src/composables/useDocument.ts
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 53 - ((52 * winheight(0) + 38) / 76)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
53
normal! 07|
lcd ~/Code/balance-tracker-vue-firebase-typescript-tailwind
tabedit ~/Code/balance-tracker-vue-firebase-typescript-tailwind/src/router/index.ts
set splitbelow splitright
set nosplitbelow
set nosplitright
wincmd t
set winminheight=0
set winheight=1
set winminwidth=0
set winwidth=1
argglobal
setlocal fdm=manual
setlocal fde=0
setlocal fmr={{{,}}}
setlocal fdi=#
setlocal fdl=0
setlocal fml=1
setlocal fdn=20
setlocal fen
silent! normal! zE
let s:l = 74 - ((39 * winheight(0) + 30) / 60)
if s:l < 1 | let s:l = 1 | endif
exe s:l
normal! zt
74
normal! 03|
lcd ~/Code/balance-tracker-vue-firebase-typescript-tailwind
tabnext 4
set stal=1
if exists('s:wipebuf') && getbufvar(s:wipebuf, '&buftype') isnot# 'terminal'
  silent exe 'bwipe ' . s:wipebuf
endif
unlet! s:wipebuf
set winheight=1 winwidth=20 winminheight=1 winminwidth=1 shortmess=filnxtToOFcA
let s:sx = expand("<sfile>:p:r")."x.vim"
if file_readable(s:sx)
  exe "source " . fnameescape(s:sx)
endif
let &so = s:so_save | let &siso = s:siso_save
doautoall SessionLoadPost
unlet SessionLoad
" vim: set ft=vim :
