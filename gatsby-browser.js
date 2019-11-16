/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */
import * as ackeeTracker from 'ackee-tracker'

export const onClientEntry = () => {
    window.onload = () => {
        ackeeTracker.create({
            server: 'https://analytics.simse.io',
            domainId: '389453d6-2eb6-4142-9dd1-c03f0d3a2ce7'
        }).record()
    }
}