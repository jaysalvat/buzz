#!/usr/bin/env node

/**
 * Complete test suite for Buzz.js
 * Tests both core features and Promise support
 */

import puppeteer from 'puppeteer'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import { createServer } from 'http'
import { readFileSync } from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = resolve(__dirname, '..')

const results = {
    passed: 0,
    failed: 0,
    tests: []
}

function startServer(port) {
    return new Promise((resolvePromise) => {
        const server = createServer((req, res) => {
            let urlPath = req.url.split('?')[0]
            let filePath = resolve(projectRoot, urlPath.slice(1))

            try {
                const content = readFileSync(filePath)
                const ext = filePath.split('.').pop()
                const contentTypes = {
                    'html': 'text/html',
                    'js': 'text/javascript',
                    'mp3': 'audio/mpeg',
                    'ogg': 'audio/ogg',
                    'wav': 'audio/wav',
                    'aac': 'audio/aac'
                }

                res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain' })
                res.end(content)
            } catch (err) {
                res.writeHead(404)
                res.end('Not found')
            }
        })

        server.listen(port, () => resolvePromise(server))
    })
}

async function runTests() {
    const port = 3459
    const server = await startServer(port)
    const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox', '--autoplay-policy=no-user-gesture-required']
    })

    try {
        const page = await browser.newPage()

        console.log('\nBuzz.js - Complete Test Suite\n')
        console.log('═══════════════════════════════════════════════════════════\n')

        await page.addScriptTag({ path: resolve(projectRoot, 'dist/buzz.js') })

        const testResults = await page.evaluate(() => {
            const results = []

            function test(name, fn) {
                try {
                    fn()
                    results.push({ name, passed: true })
                } catch (error) {
                    results.push({ name, passed: false, error: error.message })
                }
            }

            // =====================================================
            // CORE FEATURES TESTS
            // =====================================================

            console.log('Testing Core Features...')

            test('buzz object exists and is defined', () => {
                if (typeof window.buzz === 'undefined') {
                    throw new Error('buzz is not defined')
                }
            })

            test('buzz.sound constructor exists', () => {
                if (typeof window.buzz.sound !== 'function') {
                    throw new Error('buzz.sound is not a function')
                }
            })

            test('Can create a sound object', () => {
                const sound = new window.buzz.sound('test.mp3')
                if (!sound) {
                    throw new Error('Failed to create sound object')
                }
            })

            const sound = new window.buzz.sound('test.mp3')

            test('Sound has play() method', () => {
                if (typeof sound.play !== 'function') {
                    throw new Error('play is not a function')
                }
            })

            test('Sound has pause() method', () => {
                if (typeof sound.pause !== 'function') {
                    throw new Error('pause is not a function')
                }
            })

            test('Sound has stop() method', () => {
                if (typeof sound.stop !== 'function') {
                    throw new Error('stop is not a function')
                }
            })

            test('Can set and get volume', () => {
                sound.setVolume(50)
                const vol = sound.getVolume()
                if (vol !== 50) {
                    throw new Error(`Expected volume 50, got ${vol}`)
                }
            })

            test('Volume respects min/max boundaries', () => {
                sound.setVolume(150)
                if (sound.getVolume() !== 100) {
                    throw new Error('Volume should be capped at 100')
                }
                sound.setVolume(-10)
                if (sound.getVolume() !== 0) {
                    throw new Error('Volume should be floored at 0')
                }
            })

            test('Can increase volume', () => {
                sound.setVolume(50)
                sound.increaseVolume(10)
                if (sound.getVolume() !== 60) {
                    throw new Error(`Expected 60, got ${sound.getVolume()}`)
                }
            })

            test('Can decrease volume', () => {
                sound.setVolume(50)
                sound.decreaseVolume(10)
                if (sound.getVolume() !== 40) {
                    throw new Error(`Expected 40, got ${sound.getVolume()}`)
                }
            })

            test('Can mute sound', () => {
                sound.unmute()
                sound.mute()
                if (!sound.isMuted()) {
                    throw new Error('Sound should be muted')
                }
            })

            test('Can unmute sound', () => {
                sound.mute()
                sound.unmute()
                if (sound.isMuted()) {
                    throw new Error('Sound should not be muted')
                }
            })

            test('Can toggle mute', () => {
                sound.unmute()
                const wasMuted = sound.isMuted()
                sound.toggleMute()
                if (sound.isMuted() === wasMuted) {
                    throw new Error('Mute state should toggle')
                }
            })

            test('Methods return this for chaining', () => {
                const result = sound.setVolume(50).mute().unmute()
                if (result !== sound) {
                    throw new Error('Methods should return this for chaining')
                }
            })

            test('isPaused() returns boolean or null', () => {
                const paused = sound.isPaused()
                if (typeof paused !== 'boolean' && paused !== null) {
                    throw new Error('isPaused should return boolean or null')
                }
            })

            test('isEnded() returns boolean or null', () => {
                const ended = sound.isEnded()
                if (typeof ended !== 'boolean' && ended !== null) {
                    throw new Error('isEnded should return boolean or null')
                }
            })

            test('getDuration() returns value', () => {
                const duration = sound.getDuration()
                if (typeof duration !== 'number' && typeof duration !== 'string') {
                    throw new Error('getDuration should return number or string')
                }
            })

            test('getTime() returns value', () => {
                const time = sound.getTime()
                if (typeof time !== 'number' && typeof time !== 'string') {
                    throw new Error('getTime should return number or string')
                }
            })

            test('Can set playback speed', () => {
                sound.setSpeed(1.5)
                const speed = sound.getSpeed()
                if (speed !== 1.5) {
                    throw new Error(`Expected speed 1.5, got ${speed}`)
                }
            })

            test('Has loop() and unloop() methods', () => {
                if (typeof sound.loop !== 'function') {
                    throw new Error('loop is not a function')
                }
                if (typeof sound.unloop !== 'function') {
                    throw new Error('unloop is not a function')
                }
            })

            test('Has bind() and unbind() methods', () => {
                if (typeof sound.bind !== 'function') {
                    throw new Error('bind is not a function')
                }
                if (typeof sound.unbind !== 'function') {
                    throw new Error('unbind is not a function')
                }
            })

            test('buzz.group constructor exists', () => {
                if (typeof window.buzz.group !== 'function') {
                    throw new Error('buzz.group is not a function')
                }
            })

            test('Can create a group of sounds', () => {
                const sound1 = new window.buzz.sound('test1.mp3')
                const sound2 = new window.buzz.sound('test2.mp3')
                const group = new window.buzz.group([sound1, sound2])
                if (!group) {
                    throw new Error('Failed to create group')
                }
            })

            test('Group has play/pause/stop methods', () => {
                const sound1 = new window.buzz.sound('test1.mp3')
                const group = new window.buzz.group([sound1])
                if (typeof group.play !== 'function') {
                    throw new Error('group.play is not a function')
                }
                if (typeof group.pause !== 'function') {
                    throw new Error('group.pause is not a function')
                }
                if (typeof group.stop !== 'function') {
                    throw new Error('group.stop is not a function')
                }
            })

            test('Utility functions exist', () => {
                if (typeof window.buzz.isSupported !== 'function') {
                    throw new Error('buzz.isSupported is not a function')
                }
                if (typeof window.buzz.toTimer !== 'function') {
                    throw new Error('buzz.toTimer is not a function')
                }
                if (typeof window.buzz.fromTimer !== 'function') {
                    throw new Error('buzz.fromTimer is not a function')
                }
            })

            test('toTimer formats time correctly', () => {
                const formatted = window.buzz.toTimer(125)
                if (formatted !== '02:05') {
                    throw new Error(`Expected "02:05", got "${formatted}"`)
                }
            })

            test('toTimer with hours formats correctly', () => {
                const formatted = window.buzz.toTimer(3665, true)
                if (formatted !== '01:01:05') {
                    throw new Error(`Expected "01:01:05", got "${formatted}"`)
                }
            })

            test('fromTimer parses time correctly', () => {
                const seconds = window.buzz.fromTimer('02:05')
                if (seconds !== 125) {
                    throw new Error(`Expected 125, got ${seconds}`)
                }
            })

            test('toPercent calculates correctly', () => {
                const percent = window.buzz.toPercent(50, 200)
                if (percent !== 25) {
                    throw new Error(`Expected 25, got ${percent}`)
                }
            })

            test('fromPercent calculates correctly', () => {
                const value = window.buzz.fromPercent(25, 200)
                if (value !== 50) {
                    throw new Error(`Expected 50, got ${value}`)
                }
            })

            // =====================================================
            // PROMISE SUPPORT TESTS
            // =====================================================

            console.log('Testing Promise Support...')

            const promiseSound = new window.buzz.sound('promise-test.mp3')

            test('fadeTo() returns Promise when no callback provided', () => {
                const result = promiseSound.fadeTo(80)
                if (typeof result !== 'object' || typeof result.then !== 'function') {
                    throw new Error('fadeTo() did not return a Promise')
                }
            })

            test('fadeTo() returns sound object when callback provided', () => {
                const result = promiseSound.fadeTo(80, () => {})
                if (result !== promiseSound) {
                    throw new Error('fadeTo() did not return sound object for chaining')
                }
            })

            test('fadeIn() returns Promise when no callback provided', () => {
                const result = promiseSound.fadeIn()
                if (typeof result !== 'object' || typeof result.then !== 'function') {
                    throw new Error('fadeIn() did not return a Promise')
                }
            })

            test('fadeIn() returns sound object when callback provided', () => {
                const result = promiseSound.fadeIn(100, () => {})
                if (result !== promiseSound) {
                    throw new Error('fadeIn() did not return sound object for chaining')
                }
            })

            test('fadeOut() returns Promise when no callback provided', () => {
                const result = promiseSound.fadeOut()
                if (typeof result !== 'object' || typeof result.then !== 'function') {
                    throw new Error('fadeOut() did not return a Promise')
                }
            })

            test('fadeOut() returns sound object when callback provided', () => {
                const result = promiseSound.fadeOut(100, () => {})
                if (result !== promiseSound) {
                    throw new Error('fadeOut() did not return sound object for chaining')
                }
            })

            test('whenReady() returns Promise when no callback provided', () => {
                const result = promiseSound.whenReady()
                if (typeof result !== 'object' || typeof result.then !== 'function') {
                    throw new Error('whenReady() did not return a Promise')
                }
            })

            test('whenReady() returns undefined when callback provided', () => {
                const result = promiseSound.whenReady(() => {})
                if (result !== undefined) {
                    throw new Error('whenReady() should not return anything with callback')
                }
            })

            test('Promises have .then(), .catch(), and .finally()', () => {
                const promise = promiseSound.fadeTo(70)
                if (typeof promise.then !== 'function') throw new Error('Missing .then()')
                if (typeof promise.catch !== 'function') throw new Error('Missing .catch()')
                if (typeof promise.finally !== 'function') throw new Error('Missing .finally()')
            })

            test('Promise chaining works', () => {
                const promise = promiseSound.fadeIn()
                const chained = promise.then(() => {})
                if (typeof chained.then !== 'function') {
                    throw new Error('Promise chaining failed')
                }
            })

            test('Callback mode maintains method chaining', () => {
                const result = promiseSound.setVolume(50).fadeTo(80, () => {})
                if (result !== promiseSound) {
                    throw new Error('Method chaining broken with callbacks')
                }
            })

            test('Multiple promises can be created', () => {
                const p1 = promiseSound.fadeTo(50)
                const p2 = promiseSound.fadeTo(60)
                const p3 = promiseSound.fadeIn()
                if (!p1 || !p2 || !p3) {
                    throw new Error('Cannot create multiple promises')
                }
            })

            return results
        })

        // Display results grouped by category
        const coreTests = testResults.slice(0, 30)
        const promiseTests = testResults.slice(30)

        console.log('Core Features:')
        coreTests.forEach(test => {
            if (test.passed) {
                console.log(`   ✅ ${test.name}`)
                results.passed++
            } else {
                console.log(`   ❌ ${test.name}`)
                console.log(`      Error: ${test.error}`)
                results.failed++
            }
        })

        console.log('\nPromise Support:')
        promiseTests.forEach(test => {
            if (test.passed) {
                console.log(`   ✅ ${test.name}`)
                results.passed++
            } else {
                console.log(`   ❌ ${test.name}`)
                console.log(`      Error: ${test.error}`)
                results.failed++
            }
        })

        console.log('\n═══════════════════════════════════════════════════════════')
        console.log(`Total: ${results.passed + results.failed} tests`)
        console.log(`✅ Passed: ${results.passed}`)
        console.log(`❌ Failed: ${results.failed}`)
        console.log('═══════════════════════════════════════════════════════════\n')

        await browser.close()
        server.close()

        if (results.failed > 0) {
            console.error('❌ Some tests failed\n')
            process.exit(1)
        } else {
            console.log('✅ All tests passed!\n')
            process.exit(0)
        }

    } catch (error) {
        console.error('Test execution error:', error)
        await browser.close()
        server.close()
        process.exit(1)
    }
}

runTests()
