import { render, screen } from '@testing-library/react';
import { mocked } from 'ts-jest/utils'
import { useSession } from 'next-auth/client';
import { SingInButton } from '.'

jest.mock('next-auth/client');

describe('ActiveLink component', () => {
    it('renders correctly when user is not authenticated', () => {
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([null, false])

        render(
            <SingInButton />
        )
    
        expect(screen.getByText('Sing in with Github')).toBeInTheDocument()
    })

    it('renders correctly when user is authenticated', () => {
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([
            { user: { name: 'Diego Ferreira', email: 'diegoferreira@example.com'}, expires: 'fake-expires'},
            false
        ])

        render(
            <SingInButton />
        )
    
        expect(screen.getByText('Diego Ferreira')).toBeInTheDocument()
    })
})