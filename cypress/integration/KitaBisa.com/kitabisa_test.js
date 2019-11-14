describe ('/Testing Automation Kitabisa.com with Cypress',  () => {

    beforeEach(function() {
        cy.visit('http://kitabisa.com')
    })

    it('(Failed Test)Test Input not Matching', () => {

        cy.log('== Login ==')
        cy.get('[alt="account"]').click()
        cy.get('[id="account-page"]',{timeout: 15000}).should('contain', 'Daftar')
        cy.get('[alt="Masuk"]').click()
        cy.get('h3').should('have.contain', 'Masuk Ke Akun Anda')

        cy.get('[autocomplete="username"]').type('081335990344')
        cy.get('[autocomplete="current-password"]').type('testmasuk')
        cy.get('[id="login_button_masuk"]').click()
        cy.wait(2000)

        cy.log('== Searching Campaign ==')
        cy.get('[id="defaultheader_search"]',{timeout: 15000}).click()
        cy.get('[id="search_inputfield_cari-penggalangan"]').clear().type('Test')
        cy.wait(2000)
        cy.get('[id="search_card_pencarian-populer-0"]').contains('Tidak Adanya Asrama, Santri Kami Tidur Di kelas').click()
        cy.get('h1').should('have.contain', 'Tidak Adanya Asrama, Santri Kami Tidur Di kelas')
        
        cy.log('== Input Donasi ==')
        cy.get('[id="campaign-detail_button_donasi-sekarang"]').click()
        cy.get('span').should('have.contain', 'Tidak Adanya Asrama, Santri Kami Tidur Di kelas')

        cy.log('== Case 1 ==')
        // Error Case 1, Cant input with multiples of thousands
        cy.get('input[name="amount"]').type('30300')
        cy.get('[id="contribute_button_lanjutkan-pembayaran"]').click()
        cy.get('p').should('contain', 'Jumlah donasi harus dalam kelipatan ribuan.')
        cy.get('p').should('contain', 'Metode pembayaran tidak boleh kosong')

        cy.log('== Case 2 ==')
        // Error Case 2, Donation Minimal
        cy.get('input[name="amount"]').clear().type('300')
        cy.get('[id="contribute_button_lanjutkan-pembayaran"]').click()
        cy.get('p').should('contain', 'Jumlah donasi minimal Rp 10.000.')
        cy.get('p').should('contain', 'Metode pembayaran tidak boleh kosong')
    })

    it('(Success Test) Test Input with Anonim', () => {

        cy.log('== Login ==')
        cy.get('[alt="account"]').click()
        cy.get('[id="account-page"]',{timeout: 15000}).should('contain', 'Daftar')
        cy.get('[alt="Masuk"]').click()
        cy.get('h3').should('have.contain', 'Masuk Ke Akun Anda')

        cy.get('[autocomplete="username"]').type('081335990344')
        cy.get('[autocomplete="current-password"]').type('testmasuk')
        cy.get('[id="login_button_masuk"]').click()
        cy.wait(2000)

        cy.log('== Searching Campaign ==')
        cy.get('[id="defaultheader_search"]',{timeout: 15000}).click()
        cy.get('[id="search_inputfield_cari-penggalangan"]').clear().type('Test')
        cy.wait(2000)
        cy.get('[id="search_card_pencarian-populer-0"]').contains('Tidak Adanya Asrama, Santri Kami Tidur Di kelas').click()
        cy.get('h1').should('have.contain', 'Tidak Adanya Asrama, Santri Kami Tidur Di kelas')
        
        cy.log('== Input Donasi ==')
        cy.get('[id="campaign-detail_button_donasi-sekarang"]',{timeout: 15000}).click()
        cy.get('span').should('have.contain', 'Tidak Adanya Asrama, Santri Kami Tidur Di kelas')

        cy.log('== Case 3 ==')
        // Case 3, Success click donation with Anonim
        cy.get('input[name="amount"]',{timeout: 15000}).clear().type('300000')
        cy.get('[id="contribute_button_pilih-metode-pembayaran"]').click()
        cy.get('[alt="Mandiri Virtual Account"]').click()
        cy.get('[id="donasi-anonim"]').check({force: true})
        cy.get('p').should('not.have.contain', 'Jumlah donasi minimal Rp 10.000.')
        cy.get('p').should('not.have.contain', 'Metode pembayaran tidak boleh kosong')
        cy.get('[id="contribute_button_lanjutkan-pembayaran"]').click()
        cy.get('h2').should('contain', 'Instruksi Pembayaran')
        cy.get('h4').should('contain', 'Transfer sesuai nominal di bawah ini:')
        cy.get('span').should('contain', '300.000')
    })

    it('(Success Test) Test Input with Comentar', () => {

        cy.log('== Login ==')
        cy.get('[alt="account"]').click()
        cy.get('[id="account-page"]',{timeout: 15000}).should('contain', 'Daftar')
        cy.get('[alt="Masuk"]').click()
        cy.get('h3').should('have.contain', 'Masuk Ke Akun Anda')

        cy.get('[autocomplete="username"]').type('081335990344')
        cy.get('[autocomplete="current-password"]').type('testmasuk')
        cy.get('[id="login_button_masuk"]').click()
        cy.wait(2000)

        cy.log('== Searching Campaign ==')
        cy.get('[id="defaultheader_search"]',{timeout: 15000}).click()
        cy.get('[id="search_inputfield_cari-penggalangan"]').clear().type('Test')
        cy.wait(2000)
        cy.get('[id="search_card_pencarian-populer-0"]').contains('Tidak Adanya Asrama, Santri Kami Tidur Di kelas').click()
        cy.get('h1').should('have.contain', 'Tidak Adanya Asrama, Santri Kami Tidur Di kelas')
        
        cy.log('== Input Donasi ==')
        cy.get('[id="campaign-detail_button_donasi-sekarang"]').click()
        cy.get('span').should('have.contain', 'Tidak Adanya Asrama, Santri Kami Tidur Di kelas')

        cy.log('== Case 4 ==')
        // Case 4, Success click donation with Comentar
        cy.get('input[name="amount"]').clear().type('330000')
        cy.get('[id="contribute_button_pilih-metode-pembayaran"]').click()
        cy.get('[alt="Mandiri Virtual Account"]').click()
        cy.get('[id="komentar-donasi"]').check({force: true})
        cy.get('textarea[id="contribute_textarea_dukungan"]').clear().type('Semoga Bermanfaat')
        cy.get('p').should('not.have.contain', 'Jumlah donasi minimal Rp 10.000.')
        cy.get('p').should('not.have.contain', 'Metode pembayaran tidak boleh kosong')
        cy.get('[id="contribute_button_lanjutkan-pembayaran"]').click()
        cy.get('h2').should('contain', 'Instruksi Pembayaran')
        cy.get('h4').should('contain', 'Transfer sesuai nominal di bawah ini:')
        cy.get('span').should('contain', '330.000')
    })

})