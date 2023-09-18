using System.Text.Json.Serialization;

namespace CompanyX.Models;

/// <summary>
/// A base class that delivers the required erp data to measurement units.
/// </summary>
[JsonDerivedType(typeof(MSDynamicsRecord))]
public class CustomerErpRecord
{
  public int? ProductionPlanNumber { get; set; }
  public string NameOfTheProduction { get; set; }
}