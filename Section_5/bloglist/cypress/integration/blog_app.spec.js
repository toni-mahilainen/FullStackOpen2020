import 'cypress-react-selector'

describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        cy.createUser({ 
            name: 'Toni Mahilainen', username: 'tonima', password: 'salainen' 
        })
        cy.createUser({ 
            name: 'Mikko Lahtinen', username: 'mikkola', password: 'salaisempi' 
        })
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

        describe('When logged in', function () {
            beforeEach(function () {
                cy.login({
                    username: 'tonima', password: 'salainen'
                })
            })

            it('A blog can be created', function () {
                cy.createBlog({
                    title: 'The blog 1',
                    author: 'Toni Mahilainen',
                    url: 'https://blog.theblog1.com',
                    likes: 0
                })

                cy.contains('The blog 1')
            })

            describe('When blog is created', function () {
                beforeEach(function () {
                    cy.createBlog({
                        title: 'The blog 1',
                        author: 'Toni Mahilainen',
                        url: 'https://blog.theblog1.com',
                        likes: 1
                    })
                })

                it('existing blog can be liked', function () {
                    cy.get('.toggleBlogInfoBtn').click()

                    cy.get('#likeBtn').parent().find('span')
                        .then((span) => {
                            const likesAtStart = parseInt(span.text())

                            cy.get('#likeBtn').click()
                                .then(() => {
                                    const likesAtEnd = parseFloat(span.text())

                                    expect(likesAtEnd).to.eq(likesAtStart + 1)
                                })
                        })
                })

                it('the blog can also be deleted', function () {
                    cy.get('.toggleBlogInfoBtn').click()

                    cy.get('#deleteBlogBtn').click()
                    cy.contains('The blog 1').should('not.exist')
                })

                it('only the user who added the blog can delete it', function () {
                    cy.get('#logoutBtn').click()

                    cy.login({
                        username: 'mikkola', password: 'salaisempi'
                    })

                    cy.get('.toggleBlogInfoBtn').click()
                    cy.get('#deleteBlogBtn').should('not.exist')
                })

                describe('When multiple blogs are created', function () {
                    beforeEach(function () {
                        cy.createBlog({
                            title: 'The blog 2',
                            author: 'Toni Mahilainen',
                            url: 'https://blog.theblog2.com',
                            likes: 2
                        })

                        cy.createBlog({
                            title: 'The blog 20',
                            author: 'Toni Mahilainen',
                            url: 'https://blog.theblog20.com',
                            likes: 20
                        })

                        cy.createBlog({
                            title: 'The blog 32',
                            author: 'Toni Mahilainen',
                            url: 'https://blog.theblog32.com',
                            likes: 32
                        })
                    })

                    it('blogs are sorted by likes descending', function () {
                        cy.get('.toggleBlogInfoBtn').each(button => cy.get(button).click())
                        cy.get('.likes')
                            .should(objArray => {
                                const arrayLastIngex = objArray.length - 1
                                const likesLastBlog = Number(objArray[arrayLastIngex].innerHTML)
                                const likesFirstBlog = Number(objArray[0].innerHTML)

                                expect(likesLastBlog).to.be.lessThan(likesFirstBlog)
                            })
                    })
                })
            })
        })
    })
})