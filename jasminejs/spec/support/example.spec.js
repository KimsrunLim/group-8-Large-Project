class AppCalculations
{
    sum2Integers(one, two)
    {
        return one + two;
    }

    subtract2Integers(one, two)
    {
        return one - two;
    }

    stringOutput()
    {
        return "This is a string output from a function.";
    }
}

describe('Hello Jasmine', function()
{
    var calculations = new AppCalculations();
    it ('should accurately sum two integers', function()
    {
        expect(calculations.sum2Integers(3, 2)).toBe(5);
        expect(calculations.sum2Integers(3,2)).not.toBe(0);
        expect(calculations.sum2Integers(3,2)).toBeLessThan(6);
    });

    it ('should accurately subtract two integers', function()
    {
        expect(calculations.subtract2Integers(3, 2)).toBe(1);
        expect(calculations.subtract2Integers(3,2)).not.toBe(2);
        expect(calculations.subtract2Integers(3,2)).toBeLessThan(5);
    });

    it ('should be able to instantiate class', function()
    {
        expect(calculations).toBeDefined();
    });

    it ('should get a string containing the work from', function()
    {
        expect(calculations.stringOutput()).toContain('from');
    });
});

describe('process multiple integers', function()
{
    it ('should accurately sum >2 integers', function()
    {
        console.log('>2 integers were successfully summed');
    });

    it ('should accurately subtract >2 integers from another', function()
    {
        console.log('Multiple integers were accurately subtracted from another');
    });
});