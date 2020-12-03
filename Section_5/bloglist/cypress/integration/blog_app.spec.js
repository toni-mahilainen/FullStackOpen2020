describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            name: 'Toni Mahilainen',
            username: 'tonima',
            password: 'salainen'
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.get('#username')
        cy.get('#password')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#username').type('tonima')
            cy.get('#password').type('salainen')
            cy.contains('login').click()

            cy.contains('Toni Mahilainen logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#username').type('tonima')
            cy.get('#password').type('väärä')
            cy.contains('login').click()

            cy.get('.error')
                .should('contain', 'Invalid username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
        })

        describe.only('When logged in', function () {
            beforeEach(function () {
                cy.login({
                    username: 'tonima', password: 'salainen'
                })
            })

            it('A blog can be created', function () {
                cy.createBlog({
                    title: 'The blog 1',
                    author: 'Toni Mahilainen',
                    url: 'https://blog.theblog1.com'
                })

                cy.contains('The blog 1')
            })

            describe('When blog is created', function () {
                beforeEach(function () {
                    cy.createBlog({
                        title: 'The blog 1',
                        author: 'Toni Mahilainen',
                        url: 'https://blog.theblog1.com'
                    })
                })

                it('existing blog can be liked', function () {
                    cy.get('#toggleBlogInfoBtn').click()

                    cy.get('#likeBtn').parent().find('span')
                        .then((span) => {
                            // capture what num is right now
                            const likesAtStart = parseInt(span.text())

                            cy.get('#likeBtn').click()
                                .then(() => {
                                    // now capture it again
                                    const likesAtEnd = parseFloat(span.text())

                                    // make sure it's what we expected
                                    expect(likesAtEnd).to.eq(likesAtStart + 1)
                                })
                        })
                })
            })
        })
    })
})